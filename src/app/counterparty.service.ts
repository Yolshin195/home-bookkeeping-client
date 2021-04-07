import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Counterparty } from './counterparty';

@Injectable({
  providedIn: 'root'
})
export class CounterpartyService {
  private REST_API_SERVER = "http://localhost:8080/counterparty";

  items: Counterparty[] = [
    {
      id: 1,
      title: "Пятерочка",
      description: "Пятерочка по адрессу 9 мая 53"
    },
    {
      id: 2,
      title: "Магнит",
      description: "Пятерочка по адрессу Бородино"
    }
  ]

  private resourceSource = new BehaviorSubject<Counterparty[]>([]);
  resource = this.resourceSource.asObservable();

  constructor(private _http: HttpClient) { this.init(); }

  init() {
    this._http.get<Counterparty[]>(this.REST_API_SERVER)
      .subscribe(this.next.bind(this));
  }

  add(counterparty: Counterparty): void {
    this._http.post<Counterparty>(this.REST_API_SERVER, counterparty).subscribe(item => {
        this.next([item,...this.resourceSource.getValue()])
    });
    console.log(counterparty);
  }

  next(counterpartyList: Counterparty[]): void {
    this.resourceSource.next(counterpartyList);
  }

  get(id:number) {
    return this.items.find(item => item.id === id);
  }

  getAll(): Observable<Counterparty[]> {
    return  this._http.get<Counterparty[]>(this.REST_API_SERVER);
  }
}
