import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CounterpartyService } from '../counterparty.service';
import { NomenclatureService } from '../nomenclature.service';
import { Price } from '../price';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-price-create',
  templateUrl: './price-create.component.html',
  styleUrls: ['./price-create.component.css']
})
export class PriceCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    public counterpartyService: CounterpartyService,
    public nomenclatureService: NomenclatureService,
    private priceService: PriceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.onCreateForm();
  }

  onCreateForm(): FormGroup {
    return this.formBuilder.group({
      price: [0, Validators.required],
      counterparty: ['', Validators.required],
      nomenclature: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    let nomenclature = this.nomenclatureService.get(Number(this.form.value.nomenclature));
    let counterparty = this.counterpartyService.get(Number(this.form.value.counterparty));
    let price = Number(this.form.value.price);
    this.priceService.add(({nomenclature, counterparty, price} as Price));
    
    this.form = this.onCreateForm();
  }

}
