// import { dal } from "../2-utils/dal";
import { OkPacket } from "mysql2/promise";
import { execute } from "../2-utils/dal";
import { CardModel } from "../4-models/CardModel";

// export function getCards() {
//     return dal.getAllCards();
// }

export async function getCards(): Promise<CardModel[]>{
    const query = "SELECT * FROM businesscard.cards";
    const [rows] = await execute<CardModel[]>(query);
    return rows
}
export async function getAllUserCards(userid: number): Promise<CardModel[]>{
    const query = `SELECT * FROM businesscard.cards WHERE userid = ${userid}`;
    const [rows] = await execute<CardModel[]>(query);
    return rows
}

export async function getCardById(id: number): Promise<CardModel>{
    const query = "SELECT * FROM businesscard.cards WHERE id = ?";
    const [rows] = await execute<CardModel[]>(query, [id]);
    if(rows.length === 0) return null;
    return rows[0];
}
// export async function getCard(id: number) {
//     // Get all cards
//     const cards = await getCards();
//     // Find specific cards
//     const card = cards.find(c => c.id === id);
//     if (!card) throw new Error();
//     return card;
// }

export async function addCard( userid: number, businessName: string, businessDescription: string,  phone: string, email, template: number){
    // const query = "INSERT INTO businesscard.cards( userid, templateNum, businessName, businessDescription, phone, email ) VALUES('?', '?', '?', '?','?', '?'); ";
    const query = `INSERT INTO businesscard.cards( userid, templateNum, businessName, businessDescription, phone, email ) VALUES('${userid}', '${template}', '${businessName}', '${businessDescription}','${phone}', '${email}'); `;

    const [results] = await execute<OkPacket>(query)
    // const [results] = await execute<OkPacket>(query, [userid, template, businessName, businessDescription, phone, email ])
    console.log(results);
    
    // const [rows] = await execute<CardModel[]>(query);
    const id = results.insertId;
    return {
        id,
        userid,
        template,
        businessName,
        businessDescription,
        phone,
        email,

    };
}

// export async function addCard(businessName: string, businessDescription: string, image: File, phone: string, email: string, template: number) {
//     // get all cards
//     const cards = await getCards();

//     // add the new card to the cards array
//     const id = Math.max(...cards.map(c => c.id)) + 1;
//     const card: CardModel = {
//         id,
//         businessName,
//         businessDescription,
//         phone,
//         image,
//         email,
//         template
        
//     };
//     cards.push(card);

//     // save all cards
//     await dal.saveAllCards(cards);

//     return card;
// }





export async function deleteCard(id: number) {
    // get all cards
    let cards = await getCards();

    // delete the card
    cards = cards.filter(c => c.id !== id);

    // save cards
    // await dal.saveAllCards(cards);
}




export async function updateCard(cardToUpdate: CardModel) {
    // get all cards
    let cards = await getCards();

    // update the required card
    const card = cards.find(c => c.id === cardToUpdate.id);
    if (!card) throw new Error();
    
    card.businessName = cardToUpdate.businessName;
    // card.card = cardToUpdate;

    // save cards
    // await dal.saveAllCards(cards);
    return card;
}