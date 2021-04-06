import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nomenclature } from '../nomenclature';
import { NomenclatureService } from '../nomenclature.service';

@Component({
  selector: 'app-nomenclature-create',
  templateUrl: './nomenclature-create.component.html',
  styleUrls: ['./nomenclature-create.component.css']
})
export class NomenclatureCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private nomenclatureService: NomenclatureService, private formBuilder: FormBuilder) { }

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
    this.nomenclatureService.add(this.form.value as Nomenclature);
  }

}
