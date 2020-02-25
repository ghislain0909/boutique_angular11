import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Marchandise } from '../shared/models/marchandise';
import { MarchandiseService } from '../shared/service/marchandise.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-marchandise',
  templateUrl: './marchandise.component.html',
  styleUrls: ['./marchandise.component.css']
})
export class MarchandiseComponent implements OnInit {

  private marchandiseForm: FormGroup;
  protected marchandises: Marchandise[];
  pagedItems: Array<any>; 

  constructor(private formBuilder: FormBuilder, private marchandiseService: MarchandiseService,
    private toastrService: ToastrService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.marchandiseForm = this.formBuilder.group({
      marchandise: ['', Validators.required],
      produits: []
    })
    this.getAllMarchandises();
  }

   // convenience getter for easy access to form fields
   get f() { return this.marchandiseForm.controls; }

  beginPagination(pagedItems: Array<any>) {  
    this.pagedItems = pagedItems;  
  }

  private getAllMarchandises() {
    return this.marchandiseService.getMarchandises()
    .pipe(first())
    .subscribe(data => {
      this.marchandises = data;
    }, error => {
      console.log(error);
    })
  }

  onEditMarchandise(marchandise) {
    this.marchandiseForm = this.formBuilder.group({
      marchandise: [marchandise['marchandise'], Validators.required],
      produits: [marchandise['produits']]
    })
  }

  protected onFormSubmit() {
    return this.marchandiseService.createMarchandise(this.marchandiseForm.value)
    .pipe(first())
    .subscribe(data =>{
      this.toastrService.success("Enregistrement effectué avec succès")
    })
  }

}
