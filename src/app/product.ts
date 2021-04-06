import { Nomenclature } from "./nomenclature";

export interface Product {
    id: number,
    nomenclature: Nomenclature,
    amount: number,
    price: number,
    sum: number
}
