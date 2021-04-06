import { Counterparty } from "./counterparty";
import { Nomenclature } from "./nomenclature";

export interface Price {
    id: number,
    price:  number,
    create: Date,
    nomenclature: Nomenclature,
    counterparty: Counterparty
}
