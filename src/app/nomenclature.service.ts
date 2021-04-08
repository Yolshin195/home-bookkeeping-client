import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Nomenclature } from './nomenclature';

@Injectable({
  providedIn: 'root'
})
export class NomenclatureService {
  private REST_API_SERVER = "http://localhost:8080/nomenclature";

  items: Nomenclature[] = [
    {
      id: 1,
      title: "Хлеб",
      description: "Хлеб нарезной с зерном"
    },
    {
      id: 2,
      title: "Молоко",
      description: "Молоко свежее"
    }
  ]

  private resurceSource = new BehaviorSubject<Nomenclature[]>([]);
  resurce = this.resurceSource.asObservable();

  constructor(private _http: HttpClient) {this.init();}

  init() {
    this._http.get<Nomenclature[]>(this.REST_API_SERVER)
      .subscribe(this.next.bind(this));
  }

  next(nomenclatureList: Nomenclature[]) {
    this.resurceSource.next(nomenclatureList);
  }

  add(nomenclature: Nomenclature): void {
    this._http.post<Nomenclature>(this.REST_API_SERVER, nomenclature).subscribe(item => {
        this.next([item,...this.resurceSource.getValue()])
    });
    console.log(nomenclature);
  }

  get(id:number) {
    return this.resurceSource.getValue().find(item => item.id === id);
  }

  getAll(): Observable<Nomenclature[]> {
    return this._http.get<Nomenclature[]>(this.REST_API_SERVER);
  }
}
