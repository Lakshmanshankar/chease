import { CosmosClient, Database, Container } from "@azure/cosmos";

class CosmosSingletonClass {
  private database: Database | null;
  private container: Container | null;
  constructor() {
    this.database = null;
    this.container = null;
  }

  /**
   * This Intializes the Azure cosmosDB instance and store it in this.database, this.container.
   *
   * 1. get container,db by getContainer() and getDatabase() Methods.
   * 2. container is used to create/Delete/find items from the cosmosDB container
   */
  public async init() {
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
    }
  }

  public getDatabase(): Database {
    return this.database!;
  }

  public getContainer(): Container {
    return this.container!;
  }

  public async insertitem(insertAbleItem: Body) {
    if (this.container) {
      const resource = await this.container.items.create(insertAbleItem);
      return resource
    }return {message:"Unsuccessfull"}
  }
  
  /**
   * uses a More Expensive find btw if you know the id of the doc then use
   * ```ts
   *  this.container.item(id,partitionkey).read()
   * ``` 
   * this is Least expensive read but here i want to fetchall the cheatsheets by user so i use 
   * More expensive operation
   * @param email string
   */
  public getUserCheatsByEmail(email:string) {
    
  }
}

const SingletonCosmos = new CosmosSingletonClass();
export default SingletonCosmos;
