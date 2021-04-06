import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderList: Order[] = [
    {
      id: 1,
      create: new Date(),
      counterparty: {
        id: 1,
        title: "Пятерочка",
        description: "9 мая 53"
      },
      products: [
        {
          id: 1,
          nomenclature: {
            id: 1,
            title: "Хлеб",
            description: "Булка свещего хлеба"
          },
          amount: 1,
          price: 54,
          sum: 54
        }
      ]
    }
  ]

  add(order: Order): void {
    order.id = this.orderList[this.orderList.length - 1].id + 1;
    this.orderList.push(order);
  }

  getOne(id: number): Order {
    return this.orderList.find(order => order.id === id);
  }

  getOrderList(): Observable<Order[]> {
    return of(this.orderList);
  }

  constructor() { }
}
