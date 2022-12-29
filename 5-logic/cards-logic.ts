import { dal } from "../2-utils/dal";
import { CardModel } from "../4-models/CardModel";

export function getCards() {
    return dal.getAllCards();
}

export async function getCard(id: number) {
    // Get all cards
    const cards = await getCards();

    // Find specific cards
    const card = cards.find(c => c.id === id);
    if (!card) throw new Error();
    
    return card;
}

export async function addCard(businessName: string, businessDescription: string, image: File, phone: string, email: string, template: number) {
    // get all cards
    const cards = await getCards();

    // add the new card to the cards array
    const id = Math.max(...cards.map(c => c.id)) + 1;
    const card: CardModel = {
        id,
        businessName,
        businessDescription,
        phone,
        image,
        email,
        template
        
    };
    cards.push(card);

    // save all cards
    await dal.saveAllCards(cards);

    return card;
}

export async function deleteCard(id: number) {
    // get all cards
    let cards = await getCards();

    // delete the card
    cards = cards.filter(c => c.id !== id);

    // save cards
    await dal.saveAllCards(cards);
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
    await dal.saveAllCards(cards);
    return card;
}