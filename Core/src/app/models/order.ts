import { Cart } from "./cart";
import { Payment } from "./payment";
import { User } from "./user";

export interface Order {
    id: number;
    user: User;
    cart: Cart;
    payment: Payment;
    createdAt: string;
}
