import { z } from 'zod';
import { ValidationError } from './ValidationError';

export interface CardModel {
    id: number;
    businessName?: string;
    businessDescription?: string;
    image?: File;
    phone?: string
    email?: string;
    instagram?: string;
    facebook?: string;
    location?: string;
    website?: string;
    template?: number;
}

export const productSchema = z.object({
    name: z.string().min(2, { message: "Name should be longer than 2 characters"}),
    price: z.number().positive({ message: "Price should be positive" })
});

export const productValidation = (req, res, next) => {
    const product = req.body;
    try {
        productSchema.parse(product);
        next()
    } catch (e) {
        next(new ValidationError(e));
    }
}