import { CosmosClient } from "@azure/cosmos";
import { log } from "console";

// vA2

const items = [
  {
    id: "001",
    email: "lakshmanshankarc@gmail.com",
    password: "SomeCrappyPassword",
    username: "Lakshmanshankar",
  },
  {
    id: "002",
    email: "lakshmanashankrc@gmail.com",
    password: "SomeCrappyPassword",
    username: "Lakshmanshankar",
  },
  {
    id: "003",
    email: "lakshmanshanrk2002@gmail.com",
    password: "SomeCrappyPassword",
    username: "Lakshmanshankar",
  },
];

const client = new CosmosClient({
  endpoint: "https://cheasedb.documents.azure.com:443/",
  key: "Y7ywEMfOCzttFhqXcKqYPNZoEtDJJ5MA4sNedumicS6u7UkWl0zWqqYBgnxxUE3INYU8TyJ0ShDAACDbBC6N2g==",
});

async function getContainer() {
  const { database } = await client.databases.createIfNotExists({
    id: "cheasedb",
  });
  console.log(`${database.id} database ready`);

  const { container } = await database.containers.createIfNotExists({
    id: "cheasecontainer",
  });
  return container;
}

async function getUserByMail() {
  const container = await getContainer();
  const resource = await container.item(items[0].id, items[0].email).read();
  log(resource.resource);
}

getUserByMail();
