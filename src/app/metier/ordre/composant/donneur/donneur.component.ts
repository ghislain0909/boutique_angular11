import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-donneur',
  templateUrl: './donneur.component.html',
  styleUrls: ['./donneur.component.css']
})
export class DonneurComponent implements OnInit {

  protected donneurForm: FormGroup;
  protected selectedValue = 'One';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.donneurForm = this.formBuilder.group({
      compte: ['', Validators.required],
      nom: ['', Validators.required],
      activite: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.donneurForm.controls; }

  public analyzeDonneur() {

  }

}
