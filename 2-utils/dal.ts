import fs from 'fs/promises';
import { CardModel } from '../4-models/CardModel';
import { UserModel } from '../4-models/UserModel';

const CARDS_FILE = './1-assets/cards.json';
const USERS_FILE = './1-assets/users.json';

async function getAllCards(): Promise<CardModel[]> {
    const cards = await fs.readFile(CARDS_FILE);
    return JSON.parse(cards.toString());
}

async function saveAllCards(cards: CardModel[]) {
    await fs.writeFile(CARDS_FILE, JSON.stringify(cards, null, 2));
}

async function getAllUsers(): Promise<UserModel[]> {
    const users = await fs.readFile(USERS_FILE);
    return JSON.parse(users.toString());
}

async function saveAllUsers(users: UserModel[]) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export const dal = {
    getAllCards, saveAllCards, getAllUsers, saveAllUsers
}