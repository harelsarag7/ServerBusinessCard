// import fs from 'fs/promises';
// import { CardModel } from '../4-models/CardModel';
// import { UserModel } from '../4-models/UserModel';

// const CARDS_FILE = './1-assets/cards.json';
// const USERS_FILE = './1-assets/users.json';

// async function getAllCards(): Promise<CardModel[]> {
//     const cards = await fs.readFile(CARDS_FILE);
//     return JSON.parse(cards.toString());
// }

// async function saveAllCards(cards: CardModel[]) {
//     await fs.writeFile(CARDS_FILE, JSON.stringify(cards, null, 2));
// }

// async function getAllUsers(): Promise<UserModel[]> {
//     const users = await fs.readFile(USERS_FILE);
//     return JSON.parse(users.toString());
// }

// async function saveAllUsers(users: UserModel[]) {
//     await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
// }


import mysql, { RowDataPacket } from "mysql2";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'harelsa123',
    port: 3306,
    database: 'businesscard',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
  });

  export function execute<T>(query: string, params?: any[]){
    return pool.promise().execute<T & RowDataPacket[]>(query, params)
  }


// export const dal = {
//     getAllCards, saveAllCards, getAllUsers, saveAllUsers
// }