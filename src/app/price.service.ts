import { Injectable } from '@angular/core';
import { Counterparty } from './counterparty';
import { Nomenclature } from './nomenclature';
import { Price } from './price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  items: Price[] = [
    {
      id: 1,
      counterparty: {
        id: 1,
        title: "Пятерочка",
        description: "Пятерочка по адрессу 9 мая 53"
      },
      nomenclature: {
        id: 1,
        title: "Хлеб",
        description: "Хлеб нарезной с зерном"
      },
      price: 20,
      create: new Date()
    }
  ];

  constructor() { }

  create(nomenclature: Nomenclature, counterparty: Counterparty, price: number) {
    this.items.push({
      id: this.items[this.items.length - 1].id + 1,
      create: new Date(),
      price,
      nomenclature,
      counterparty,
    })
  }

  set(price: Price): void {
    this.items.push(price);
  }

  getPrice(nomenclatureId: number, counterpartyId: number): number {
    let p = this.items
      .find(item => item.nomenclature.id == nomenclatureId && item.counterparty.id == counterpartyId);
    
    return (p) ? p.price : 0;
  }
}
