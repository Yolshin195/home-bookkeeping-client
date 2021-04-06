import { Counterparty } from "./counterparty";
import { Product } from "./product";

export interface Order {
    id: number,
    create: Date
    counterparty: Counterparty,
    products: Product[]
}
