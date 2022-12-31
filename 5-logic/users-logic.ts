// import { dal } from "../2-utils/dal";
import { OkPacket } from "mysql2";
import { execute } from "../2-utils/dal";
import { CardModel } from "../4-models/CardModel";
import { UserModel, UserRole } from "../4-models/UserModel";

// export function getUsers() {
//     // return dal.getAllUsers();
// }

export async function getUsers(): Promise<UserModel[]>{
    const query = "SELECT * FROM businesscard.users";
    const [rows] = await execute<UserModel[]>(query);
    return rows
}

export async function getUser(id: number): Promise<UserModel>{
    const query = "SELECT * FROM businesscard.users WHERE id = ?";
    const [rows] = await execute<UserModel[]>(query, [id]);
    if(rows.length === 0) return null;
    return rows[0];
}
// export async function getUser(id: number) {
//     // Get all users
//     const users = await getUsers();

//     // Find specific book
//     // const user = users.find(b => b.id === id);
//     // if (!user) throw new Error();

//     // return user;
// }

export async function addUser(firstName: string, lastName: string, email: string, phone: string, username: string, password: string) {
    const query = `INSERT INTO businesscard.users(firstName, lastName, email, phone, username, password) VALUES('${firstName}', '${lastName}', '${email}', '${phone}', '${username}', '${password}')`;
    
    const [results] = await execute<OkPacket>(query)

    const id = results.insertId;
    return {
        id,
        firstName,
        lastName,
        email,
        phone,
        username,
        password
    };
}
