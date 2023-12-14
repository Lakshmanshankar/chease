import { Container, CosmosClient, Database } from "@azure/cosmos";
import { CheaseUser, CheaseUserProfile, CheatSheetType, DatabaseResult } from "./types";
import { NONAME } from "dns";
import { extractUsernameFromEmail } from "./cheaseutil";

abstract class CheaseDatabase<TDatabase>{
  public abstract init(): Promise<DatabaseResult>;
  public abstract getDB(): TDatabase;
  public abstract login(user: CheaseUser): Promise<DatabaseResult>;
  public abstract getUser(user: CheaseUser): Promise<DatabaseResult>;
  public abstract getAllCheatsByEmail(email: string): Promise<any>;
  public abstract saveCheatForUser(cheatsheet: CheatSheetType, user: CheaseUserProfile): Promise<any>
}


class SingletonCosmosDB extends CheaseDatabase<Database> {

  public saveCheatForUser(cheatsheet: CheatSheetType, user: CheaseUserProfile): Promise<any> {
    throw new Error("Method not implemented.");
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
      data: []
    }
    if (!this.database && !this.container) {
      const dbName = process.env.AZURE_COSMOS_DB_NAME || "cheasedb";
      const contName =
        process.env.AZURE_COSMOS_CONTAINER_NAME || "cheasecontainer";

      const endpoint = process.env.AZURE_COSMOS_ENDPOINT || "";
      const key = process.env.AZURE_COSMOS_PRIMARY_KEY || "";
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

      console.log(`${this.database.id} database ready`);
      console.log(`${this.container.id} container ready`);
      return result
    }
    result.result = false;
    return result;
  }

  public async loginExpensive(user: CheaseUser): Promise<DatabaseResult> {
    if (!this.container) {
      return { result: false, data: [] }
    }

    else {
      try {
        const querySpec = {
          query: 'SELECT * FROM c WHERE c.id = @id',
          parameters: [
            { name: '@id', value: extractUsernameFromEmail(user.email)! },
          ],
        };

        const resources  = await this.container.items.query(querySpec).fetchAll();

        if (resources.resources.length > 0) {
          return { result: true, data: resources.resources};
        } else {
          // User doesn't exist, insert a new item
          await this.container.items.create({
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password, // ensure salted and hashed 
          });

          return { result: true, data: user };
        }
      } catch (error) {
        console.error("Error in login:", error);
        return {
          result: false,
          data: error
        }
      }
    }
  }
  public async login(user: CheaseUser): Promise<DatabaseResult> {
    if (!this.container) {
      return { result: false, data: [] }
    }

    else {
      try {
        // Perform a read operation to check if the user exists
        const resource = await this.container.item(user.email, user.email).read();
        if (resource.item.id) {
          // User exists, return result
          return { result: true, data: resource.item };
        } else {
          // User doesn't exist, insert a new item
          await this.container.items.create({
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password, // ensure salted and hashed 
          });

          // Return result after insertion
          return { result: true, data: user };
        }
      } catch (error) {
        console.error("Error in login:", error);
        return {
          result: false,
          data: error
        }
      }
    }
  }

  public getUser(user: CheaseUser): Promise<DatabaseResult> {
    return Promise.resolve({ result: true, data: [] });
  }

  public getAllCheatsByEmail(email: string): Promise<any> {
    return Promise.resolve({});
  }
}

// Assume SingletonCosmosDB, CheaseUser, and Result types are defined as in your previous discussions

class CheaseDBFactory {
  private static instance: CheaseDBFactory;

  private constructor() {
  }

  public static getInstance(): CheaseDBFactory {
    if (!CheaseDBFactory.instance) {
      CheaseDBFactory.instance = new CheaseDBFactory();
    }
    return CheaseDBFactory.instance;
  }

  public build(type: "cosmosdb"): SingletonCosmosDB;
  public build(type: "default"): SingletonCosmosDB;
  public build(type: string): never; // This ensures an error for unsupported types
  public build(type: string): any {
    switch (type) {
      case "cosmosdb":
        return new SingletonCosmosDB();
      case "default":
        return new SingletonCosmosDB();
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}


const singletonCheaseDBInstance = CheaseDBFactory.getInstance();
export default singletonCheaseDBInstance;

// async function putSomething() {
//   try {
//     const factoryInstance = CheaseDBFactory.getInstance();
//     const singletonCosmos = factoryInstance.build("cosmosdb");
//     const res = await singletonCosmos.init();

//     if (res.result) {
//       const response = await singletonCosmos.loginExpensive({
//         id: 'lakshmanashankrc',
//         email: 'lakshmanashankrc@gmail.com',
//         password: 'someSaltedHashedSecretPassword',
//         username: 'Lakshmanshankar'
//       });

//       console.log(response.data);
//     }
//   } catch (error:any) {
//     console.error(error.message);
//   }
// }

// putSomething();
