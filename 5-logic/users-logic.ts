import { dal } from "../2-utils/dal";
import { UserModel, UserRole } from "../4-models/UserModel";

export function getUsers() {
    return dal.getAllUsers();
}

export async function getUser(id: number) {
    // Get all users
    const users = await getUsers();

    // Find specific book
    const user = users.find(b => b.id === id);
    if (!user) throw new Error();

    return user;
}

export async function addUser(user: UserModel) {
    const users = await getUsers();

    const id = Math.max(...users.map(b => b.id)) + 1;
    user.id = id;
    user.role = UserRole.User;
    users.push(user);

    await dal.saveAllUsers(users);

    return user;
}
