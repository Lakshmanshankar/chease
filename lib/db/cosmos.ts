/* eslint-disable no-unused-vars */
// Libraries
import { Container, CosmosClient, Database } from '@azure/cosmos';

//Model
import { AbstractCheaseDatabase } from '@/lib/db/abstract';

// types
import { DatabaseResult, SearchConfigType, InsertItemType, CosmosQuerySpecType } from '@/types/Cosmos';
import { CheaseGoogleUser, CheaseUserProfile } from '@/types/User';
import { CheatSheetType } from '@/types/CheatsheetT';

export class SingletonCosmosDB extends AbstractCheaseDatabase<Database> {
  public saveCheatForUser(cheatsheet: CheatSheetType, user: CheaseUserProfile): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public getDB(): Database {
    return this.database!;
  }

  private database: Database | null;
  private container: Container | null;

  constructor() {
    super();
    this.database = null;
    this.container = null;
  }

  public async init(): Promise<DatabaseResult> {
    const result: DatabaseResult = {
      result: true,
      data: [],
    };
    if (!this.database && !this.container) {
      const dbName = process.env.AZURE_COSMOS_DB_NAME || 'cheasedb';
      const contName = process.env.AZURE_COSMOS_CONTAINER_NAME || 'cheasecontainer';

      const endpoint = process.env.AZURE_COSMOS_ENDPOINT || '';
      const key = process.env.AZURE_COSMOS_PRIMARY_KEY || '';
      const client = new CosmosClient({ endpoint, key });

      const database = client.database(dbName);

      await client.databases.createIfNotExists({
        id: dbName,
      });

      const { container } = await database.containers.createIfNotExists({
        id: contName,
      });

      this.database = database;
      this.container = container;

      console.log(`⭐${this.database.id} database ready`);
      console.log(`⭐${this.container.id} container ready`);
      return result;
    }
    result.result = false;
    return result;
  }

  /**
   * Login the Currently Logged Google User from Next-auth to the CosmosDB and store the current user details from
   * CosmosDB to the Local Context Provider */
  public async login(user: CheaseGoogleUser): Promise<DatabaseResult> {
    const querySpec: CosmosQuerySpecType = {
      query: 'SELECT * FROM c WHERE c.id = @id',
      parameters: [{ name: '@id', value: user.id! }],
    };
    const res = await this.insertUsingQuery(querySpec, user as InsertItemType);
    if (!res.result) {
      return { result: false, data: { message: 'Unable to Login the Current User with Cosmos' } };
    }
    return res;
  }
  //
  // public async loginUsingInsert(user: CheaseGoogleUser): Promise<DatabaseResult> {
  //   const res = this.insertUsingParitionKey({ id: user.id!, partitionkey: user.email }, user as InsertItemType);
  //   return res;
  // }
  //
  // public async loginUsingInsert2(user: CheaseGoogleUser): Promise<DatabaseResult> {
  //   const querySpec: CosmosQuerySpecType = {
  //     query: 'SELECT * FROM c WHERE c.id = @id',
  //     parameters: [{ name: '@id', value: user.id! }],
  //   };
  //   const res = await this.insertUsingQuery(querySpec, user as InsertItemType);
  //   return res;
  // }
  //
  // public async loginUsingInsert3(user: CheaseGoogleUser): Promise<DatabaseResult> {
  //   const querySpec: CosmosQuerySpecType = {
  //     query: 'SELECT * FROM c WHERE c.id = @id',
  //     parameters: [{ name: '@id', value: user.id! }],
  //   };
  //   const res = await this.deleteItem(querySpec);
  //   return res;
  // }

  public getUser(user: CheaseGoogleUser): Promise<DatabaseResult> {
    return Promise.resolve({ result: true, data: [] });
  }

  public getAllCheatsByEmail(email: string): Promise<any> {
    return Promise.resolve({});
  }

  /**
   * Delete Item from CosomsDB Container uses  Query to get the Item and then uses the item(id,partitionkey).delete()
   * delete Item if No Item Exists result will be true message: Will contain no data*/
  private async deleteItem(querySpec: CosmosQuerySpecType): Promise<DatabaseResult> {
    if (!this.container) {
      return { result: false, data: { message: '😈 Container Not Found while try to get jtem. cost:high' } };
    }
    try {
      const resource = await this.getItemUsingQuery(querySpec);
      if (resource.result) {
        const { id, email } = resource.data[0];
        const response = await this.container.item(id, email).delete();
        return { result: true, data: { message: 'successfully deleted Item', item: response } };
      } else {
        return { result: true, data: { message: ' ⚠️  No Data found when query' } };
      }
    } catch (err) {
      return { result: false, data: { message: '😈 Error in Deleting item. cost:high' } };
    }
  }

  private async getItemUsingQuery(querySpec: CosmosQuerySpecType): Promise<DatabaseResult> {
    if (!this.container) {
      return { result: false, data: { message: '😈 Container Not Found while try to get Item. cost:high' } };
    }
    try {
      const resource = await this.container.items.query(querySpec).fetchAll();
      if (resource.resources.length > 0) {
        return { result: true, data: resource.resources };
      } else {
        return { result: false, data: { message: '⚠️  No Data found when query' } };
      }
    } catch (err) {
      return { result: false, data: { message: '😈 Error in getting item using query. cost:high' } };
    }
  }

  private async updateItemUsingQuery(querySpec: CosmosQuerySpecType, data: InsertItemType): Promise<DatabaseResult> {
    if (!this.container) {
      return { result: false, data: { message: '😈 Container Not Found while Inserting. cost:high' } };
    }
    try {
      const resource = await this.container.items.query(querySpec).fetchAll();
      if (resource.resources.length > 0) {
        return { result: true, data: resource.resources };
      } else {
        try {
          const res = await this.container.items.create(data);
          return { result: true, data: res.resource };
        } catch (insertError) {
          console.error(' 👻 Error in insert operation:', insertError);
          return { result: false, data: { message: '😈 Error In Inserting Item & Item Not Exists. cost:high' } };
        }
      }
    } catch (err) {
      return { result: false, data: { message: '😈 Error in inserting item using query. cost:high' } };
    }
  }

  /** Check if the document exists with the given query if exists return the resources
   * else insert the data (it should contain id) and return result else: result:false,errormsg:data[0]
   */
  private async insertUsingQuery(querySpec: CosmosQuerySpecType, data: InsertItemType): Promise<DatabaseResult> {
    if (!this.container) {
      return { result: false, data: { message: '😈 Container Not Found while Inserting. cost:high' } };
    }
    try {
      const resource = await this.container.items.query(querySpec).fetchAll();
      if (resource.resources.length > 0) {
        return { result: true, data: resource.resources };
      } else {
        try {
          const res = await this.container.items.create(data);
          return { result: true, data: res.resource };
        } catch (insertError) {
          console.error(' 👻 Error in insert operation:', insertError);
          return { result: false, data: { message: '😈 Error In Inserting Item & Item Not Exists. cost:high' } };
        }
      }
    } catch (err) {
      return { result: false, data: { message: '😈 Error in inserting item using query. cost:high' } };
    }
  }

  /**
   * Check if Any document matches with searchConfig if Matches return the Same Data with result:true, else try to
   * Insert the data and if successfully inserted then return:result:true else result:false with Error msg in data[0]
   * 1. uses a Less Expensive Find Because of the partitionkey and id property
   */
  private async insertUsingParitionKey(searchConfig: SearchConfigType, data: InsertItemType): Promise<DatabaseResult> {
    if (!this.container) {
      return { result: false, data: { message: '😈 Container Not Found while Inserting. cost:less' } };
    }
    try {
      // uses the Id of the response to know if item exist because response don't contain document data
      const resource = await this.container.item(searchConfig.id, searchConfig.partitionkey).read();
      if (resource.item.id) {
        return { result: true, data };
      } else {
        try {
          await this.container.items.create(data);
          return { result: true, data: data };
        } catch (insertError) {
          console.error(' 👻 Error in insert operation:', insertError);
          return { result: false, data: { message: '😈 Error in creating item using ParitionKey. cost:less' } };
        }
      }
    } catch (err) {
      return { result: false, data: { message: '😈 Error in inserting item using ParitionKey. cost:less' } };
    }
  }
}
