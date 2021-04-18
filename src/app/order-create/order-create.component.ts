import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CounterpartyService } from '../counterparty.service';
import { NomenclatureService } from '../nomenclature.service';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { debounceTime } from 'rxjs/operators';
import { PriceService } from '../price.service';
import { Nomenclature } from '../nomenclature';
import { Counterparty } from '../counterparty';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  sum: number = 0;
  orderFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private orderService: OrderService,
    public counterpartyService: CounterpartyService, 
    public nomenclatureService: NomenclatureService,
    private priceService: PriceService
  ) { }

  ngOnInit(): void {
    this.orderFormGroup = this.createOrderForm();
    this.orderFormGroup.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => this.setPrice(value));
  }

  createOrderForm(): FormGroup {
    return this.formBuilder.group({
      counterparty: ['', Validators.required],
      productList: this.formBuilder.array([this.createProductForm()])
    });
  }

  createProductForm(): FormGroup {
    return this.formBuilder.group({
      nomenclature: ['', Validators.required],
      amount: 0,
      price: 0,
      sum: 0
    })
  }

  addProduct(): void {
    let productList = this.orderFormGroup.get('productList') as FormArray;
    productList.push(this.createProductForm());
  }

  removeProduct(id: number): void {
    (this.orderFormGroup.controls["productList"] as FormArray).removeAt(id);
  }

  onSubmit(): void {
    let order = this.createOrder(this.orderFormGroup.value as Order);
    this.orderService.add(order);
    this.orderFormGroup = this.createOrderForm();
    this.sum = 0;
  }

  createOrder(order: Order): Order {
    order.create = new Date();
    order.counterparty = this.counterpartyService.get(Number(order.counterparty));
    order.productList.forEach((product, i) => {
      product.nomenclature = this.nomenclatureService.get(Number(product.nomenclature));
      product.amount = Number(product.amount);
      product.price = Number(product.price);
      product.sum = Number(product.sum);
    });

    return order;
  }

  setPrice(value: Order): void {
    console.log('setPrice() ', value);

    if (value.counterparty) {
      value.productList.forEach((element, i) => {
        if (Number(element.price) > 0) return;

        if (element.nomenclature) {
          let price = this.priceService.getPrice(Number(element.nomenclature), Number(value.counterparty))
          .subscribe(price => {
            if (price > 0) {
              this.orderFormGroup
              .get('productList')
              .get(String(i))
              .get("price")
              .setValue(price);  
            }
          });
        }
      });
    }

    value.productList.forEach((element, i) => {
      if (Number(element.price) > 0 && Number(element.amount) > 0) {
        if (Number(element.price) * Number(element.amount) !== Number(element.sum)) {
          this.orderFormGroup
            .get('productList')
            .get(String(i))
            .get("sum")
            .setValue(Number(element.price) * Number(element.amount));
        }
      }
    });

    this.sum = Math.round(
      value.productList.map(p => Number(p.sum)).reduce((n, s) => n+s,0) * 100
    ) / 100;
  }

}
