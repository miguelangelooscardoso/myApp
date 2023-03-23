import { Category } from "./category";
import { Offer } from "./offer";

export interface Item {
    id: number;
    title: string;
    description: string;
    itemCategory: Category; // ???
    offer: Offer;
    price: number;
    quantity: number;
    imageName: string;
}

