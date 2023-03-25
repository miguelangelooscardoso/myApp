import { Item } from "./item";
import { User } from "./user";

export interface Feedback {
    id: number;
    user: User;
    item: Item;
    feedback: string;
    createdat: string;
}
