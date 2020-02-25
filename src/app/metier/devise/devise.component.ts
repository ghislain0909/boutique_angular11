import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeviseService } from '../shared/service/devise.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.css']
})
export class DeviseComponent implements OnInit {

  protected devises: any[];
  protected deviseForm: FormGroup;
  protected idDevise: number;
  protected pagedItems: Array<any>;
  constructor(private formBuilder: FormBuilder, private deviseService: DeviseService, private toastrService: ToastrService,
    private router: Router, private activatedRoute: ActivatedRoute, public authService : AuthenticationService) {
      this.idDevise = 5;
     }

  ngOnInit() {
    this.deviseForm = this.formBuilder.group({
      code: ['', Validators.required],
      libelle: ['', Validators.required],
      contreValeur: [ Validators.required],
    })
    this.getAllDevises();
  }

  beginPagination(pagedItems: Array<any>) {  
    this.pagedItems = pagedItems;  
  } 

   // convenience getter for easy access to form fields
   get f() { return this.deviseForm.controls; }

  private getAllDevises() {
    this.deviseService.getDevises()
    .pipe(first())
    .subscribe(data => {
      this.devises = data;
    })
  }

  public onSubmitForm() {
    this.deviseService.createDevise(this.deviseForm.value)
    .pipe(first())
    .subscribe(data => {
      this.toastrService.success("Devise enregistrée avec succès");
      this.deviseForm.reset();
    })
  }

  onEditDevise(devise) {
    this.deviseForm = this.formBuilder.group({
      code: [devise['code'], Validators.required],
      libelle: [devise['libelle'], Validators.required],
      contreValeur: [devise['contreValeur'], Validators.required],
    }) 
  }

  onDeleteDevise(id: number) {
    swal({
      title: 'Voulez vous supprimer?',
      text: 'Cette action est irréversible !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      cancelButtonText: 'Non, Annuler',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
  this.deviseService.deleteDevise(id)
    .subscribe( data => {
      this.devises.splice(id);
      this.router.navigateByUrl('/trf/devises');
    });
  }
      });
  }

}
