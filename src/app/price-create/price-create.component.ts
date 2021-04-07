import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CounterpartyService } from '../counterparty.service';
import { NomenclatureService } from '../nomenclature.service';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.onCreateForm();
  }

  onCreateForm(): FormGroup {
    return this.formBuilder.group({
      createDate: [new Date(), Validators.required],
      createTime: [new Date(), Validators.required],
      price: [0, Validators.required],
      counterparty: ['', Validators.required],
      nomenclature: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}
