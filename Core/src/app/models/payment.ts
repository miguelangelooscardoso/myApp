import { PaymentMethod } from "./payment-method";
import { User } from "./user";

export interface Payment {
    id: number;
    user: User;
    paymentMethod: PaymentMethod;
    totalAmount: number;
    shippingCharges: number;
    amountReduced: number;
    amountPaid: number;
    createdAt: string;
}
