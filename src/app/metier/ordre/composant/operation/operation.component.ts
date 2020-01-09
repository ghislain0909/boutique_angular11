import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  protected opeForm: FormGroup;
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
    this.opeForm = this.formBuilder.group({
      frais: ['', Validators.required],
      motifTransfert: ['', Validators.required],
      typeTransfert: ['', Validators.required],
      montant: ['', Validators.required],
      idDevise: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.opeForm.controls; }

  public analyzeOrdre() {

  }

}

class Type {
  name: string;
  val: number;
}

