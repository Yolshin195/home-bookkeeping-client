import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private REST_API_SERVER = "http://localhost:8080/order";
  private resourceSource = new BehaviorSubject<Order[]>([]);
  resource = this.resourceSource.asObservable();

  orderList: Order[] = [
    {
      id: 1,
      create: new Date(),
      counterparty: {
        id: 1,
        title: "Пятерочка",
        description: "9 мая 53"
      },
      productList: [
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

  constructor(private _http: HttpClient) { }

  add(order: Order): void {
    this._http.post<Order>(this.REST_API_SERVER, order).subscribe(order => {
      this.resourceSource.next([order, ...this.resourceSource.value]);
    })
  }

  get(id: number): Observable<Order> {
    let order: Order = this.resourceSource.value.find(order => order.id === id);
    if (order) {
      return of(order);
    }

    return this._http.get<Order>(`this.REST_API_SERVER/${id}`);
  }

  getAll(): Observable<Order[]> {
    this._http.get<Order[]>(this.REST_API_SERVER).subscribe(orderList => {
      this.resourceSource.next(orderList);
    });

    return this.resource;
  }

  getOne(id: number): Order {
    return this.orderList.find(order => order.id === id);
  }

  getOrderList(): Observable<Order[]> {
    return of(this.orderList);
  }
}
