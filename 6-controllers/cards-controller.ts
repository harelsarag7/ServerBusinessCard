import express from 'express';
import { verifyUser } from '../3-middleware/verifyUser';
import { CardModel, productValidation } from '../4-models/CardModel';
import { ResourceNotFoundError } from '../4-models/ResourceNotFoundError';
import { UserRole } from '../4-models/UserModel';
import { getCardById, getCards, addCard, updateCard, deleteCard, getAllUserCards } from '../5-logic/cards-logic';

export const cardsRouter = express.Router();

// cardsRouter.get('/cards', verifyUser([UserRole.Admin, UserRole.User, UserRole.Viewer]), async (req, res, next) => {
cardsRouter.get('/cards', async (req, res, next) => {
    try {
        const cards = await getCards();
        res.json(cards);
    } catch (e) {
        next(e);
    }
});

cardsRouter.get('/cards/:userid', async (req, res, next) => {
    const userid = +req.params.userid;
    try {
        const cards = await getAllUserCards(userid);
        res.json(cards);
    } catch (e) {
        next(e);
    }
});

cardsRouter.get('/card/:id([0-9]+)', async (req, res, next) => {
    try {
        const id = req.params.id;
        const card = await getCardById(+id);
        // console.log(card);
        
        res.json(card);
    } catch (e) {
        next(new ResourceNotFoundError());
    }
});


// have to change the validation
// cardsRouter.post('/cards', verifyUser([UserRole.Admin]), productValidation, async (req, res) => {
cardsRouter.post('/cards', async (req, res) => {
    // const userid = req.body.id;
    const userid = +req.body.userid;
    console.log(userid);
    
    const businessName = req.body.businessName;
    const businessDescription = req.body.businessDescription;
    // const image = req.body.image;
    const phone = req.body.phone;
    const email = req.body.email;
    const templateNum = +req.body.templateNum;
    // const price = req.body.price;
    // if (!name || !price) {
    //     res.status(400).send('Missing name or price');
    //     return;
    // }

    const card = await addCard(userid, businessName, businessDescription, phone, email, templateNum);
    res.status(201).json(card);
}
);

// cardsRouter.put('/cards/:id', verifyUser([UserRole.Admin]), async (req, res, next) => {
//     const id = +req.params.id;
//     const businessName = req.body.name;
//     // const price = +req.body.price;

//     let card: CardModel = {
//         id,
//         businessName,
//         // price
//     };

//     try {
//         const result = await updateCard(card);
//         res.json(result);
//     } catch (e) {
//         next(new ResourceNotFoundError());
//     }
// });

cardsRouter.delete('/cards/:id', async (req, res) => {
    const id = +req.params.id;
    await deleteCard(id);
    res.sendStatus(204);
});