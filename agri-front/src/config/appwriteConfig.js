import { Account, Client, Databases, ID, Query, Storage,  } from 'appwrite';
import { APPWRITE_DATABASE_ID, APPWRITE_PROJECT_ID } from './env';

const client = new Client()
    .setProject(APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);


const databaseId = APPWRITE_DATABASE_ID;
const usersCollectionId = "users";
const bucketId = "plantes";

export { account, bucketId, client, databaseId, databases, ID, Query, storage, usersCollectionId };

