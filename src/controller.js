import { displayItems } from './item.js';

export async function itemList(req, res) {
    try {
        const dispItems = await displayItems();
        res.json({dispItems});
    } catch (error) {
        console.error(error);
    }
}