import {Request, Response} from  'express'
import { createPromotion } from '../../Service/Promotion/CreatePromotion.service'

export default async function CreatePromotion(req: Request, res: Response) {
    try{

        const { description, discount, start_date, end_date, car_id } = req.body;
        await createPromotion(description, discount, start_date, end_date, car_id);

        res.status(201).json({message: 'Promotion create sucessfully'});
    }
    catch(error) {
        console.error('Error creating promotion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}