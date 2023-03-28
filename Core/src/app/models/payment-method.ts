export interface PaymentMethod {
    id: number;
    type: string;
    provider: string;
    available: boolean;
    reason: string;
}
