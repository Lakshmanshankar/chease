// types
import { SingletonCosmosDB } from '@/lib/db/cosmos';

type factoryDbType = 'cosmosdb' | 'default';
class CheaseDBFactory {
  private static instance: CheaseDBFactory;

  private constructor() {} // make this singleton

  public static getInstance(): CheaseDBFactory {
    if (!CheaseDBFactory.instance) {
      CheaseDBFactory.instance = new CheaseDBFactory();
    }
    return CheaseDBFactory.instance;
  }

  public build(dbname: factoryDbType): SingletonCosmosDB | never {
    if (dbname === 'cosmosdb') {
      return new SingletonCosmosDB();
    } else if (dbname === 'default') {
      return new SingletonCosmosDB();
    } else {
      throw new Error(`Unsupported Databse ${dbname} `);
    }
  }
  // public build(type: 'cosmosdb'): SingletonCosmosDB;
  // public build(type: 'default'): SingletonCosmosDB;
  // public build(type: string): never; // This ensures an error for unsupported types
  // public build(type: string): SingletonCosmosDB | never {
  //   switch (type) {
  //     case 'cosmosdb':
  //       return new SingletonCosmosDB();
  //     case 'default':
  //       return new SingletonCosmosDB();
  //     default:
  //       throw new Error(`Unsupported database type: ${type}`);
  //   }
  // }
}

const singletonCheaseDBInstance = CheaseDBFactory.getInstance();
export default singletonCheaseDBInstance;

// async function putSomething() {
//   try {
//     const factoryInstance = CheaseDBFactory.getInstance();
//     const singletonCosmos = factoryInstance.build('cosmosdb');
//     const res = await singletonCosmos.init();
//     if (res.result) {
//       // const response = await singletonCosmos.loginWithGoogle({
//       //   id: 'lakshmanashankrc',
//       //   email: 'lakshmanashankrc@gmail.com',
//       //   image: 'someSaltedHashedSecretPassword',
//       //   username: 'Lakshmanshankar',
//       // });
//       const response = await singletonCosmos.login({
//         username: 'Martin',
//         id: 'lakshmanashankrc@gmail',
//         email: 'lakshmanashankrc@gmail.com',
//         image: 'https://lh3.google.com/x11c12',
//         cheatsheetNames: [],
//       });
//       console.log(response.data, response.result);
//       return { result: response.result, data: response.data };
//     }
//   } catch (error: any) {
//     console.error(error.message);
//   }
// }
// putSomething();
