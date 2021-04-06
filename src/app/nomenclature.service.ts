import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
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
  constructor(private _http: HttpClient) { }

  get(id:number) {
    return this.items.find(item => item.id === id);
  }

  getAll(): Observable<Nomenclature[]> {
    return this._http.get<Nomenclature[]>(this.REST_API_SERVER);
  }
}
