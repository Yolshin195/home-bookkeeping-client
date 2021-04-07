import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Counterparty } from '../counterparty';
import { CounterpartyService } from '../counterparty.service';

@Component({
  selector: 'app-counterparty-create',
  templateUrl: './counterparty-create.component.html',
  styleUrls: ['./counterparty-create.component.css']
})
export class CounterpartyCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private counterpartyService: CounterpartyService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onSubmint(): void {
    this.counterpartyService.add(this.form.value as Counterparty);
  }

}
