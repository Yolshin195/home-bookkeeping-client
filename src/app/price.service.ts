import { HttpClient } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Counterparty } from './counterparty';
import { Nomenclature } from './nomenclature';
import { Price } from './price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private REST_API_SERVER = "http://localhost:8080/price";
  private resourceSource = new BehaviorSubject<Price[]>([]);
  resource = this.resourceSource.asObservable();

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

  constructor(private _html: HttpClient) { }

  add(price: Price):void {
    this._html.post<Price>(this.REST_API_SERVER, price).subscribe(price => {
      this.resourceSource.next([price, ...this.resourceSource.value]);
    })
  }

  get(): Observable<Price> {
    return null;
  }

  getAll(): Observable<Price[]> {
    this._html.get<Price[]>(this.REST_API_SERVER).subscribe(price_list => {
      this.resourceSource.next(price_list);
    })
    return this.resource;
  }

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

  getPrice(nomenclatureId: number, counterpartyId: number): Observable<number> {
    return this._html.get<Price>(`${this.REST_API_SERVER}/find?nID=${nomenclatureId}&cID=${counterpartyId}`)
    .pipe(map(price => {
      if (price) return price.price;
      return 0;
    }));
  }
}
