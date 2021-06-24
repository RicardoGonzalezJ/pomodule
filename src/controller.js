import { displayItems } from './model.js';

export async function itemList(req, res) {
    try {
        const dispItems = await displayItems();
        res.json({dispItems});
    } catch (error) {
        console.error(error);
    }
}