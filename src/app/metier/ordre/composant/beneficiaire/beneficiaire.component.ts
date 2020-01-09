import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.css']
})
export class BeneficiaireComponent implements OnInit {

  protected benForm: FormGroup;
  protected selectedValue = 'One';
  protected items: Type[] = [
    {name: 'One', val: 1},
    {name: 'Two', val: 2},
    {name: 'Three', val: 3}
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.benForm = this.formBuilder.group({
      compte: ['', Validators.required],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      idBanque: ['', Validators.required],

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.benForm.controls; }

  public analyzeOrdre() {

  }

}

class Type {
  name: string;
  val: number;
}
