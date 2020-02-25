import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pays } from '../shared/models/pays';
import { PaysService } from '../shared/service/pays.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  protected paysForm: FormGroup;
  protected listPays: Pays[];
  pagedItems: Array<any>; 

  constructor(private formBuilder: FormBuilder, private paysService: PaysService, private toastrService: ToastrService,
    private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.paysForm = this.formBuilder.group({
      code: ['', Validators.required],
      pays: ['', Validators.required],
      notation: ['', Validators.required]
    });
    this.getAllPays();
  }

  protected onEditPays(pays) {
    return this.paysForm = this.formBuilder.group({
      code: [pays['code'], Validators.required],
      pays: [pays['pays'], Validators.required],
      notation: [pays['notation'],Validators.required]
    })
  }
  
  protected getAllPays() {
    return this.paysService.listerPays()
    .pipe(first())
    .subscribe(data => {
      this.listPays = data;
    }, err =>{
      console.log(err);
    });
  }

  beginPagination(pagedItems: Array<any>) {  
    this.pagedItems = pagedItems;  
  }  

  protected onFormSubmit() {
    return this.paysService.createPays(this.paysForm.value)
    .pipe(first())
    .subscribe(data => {
      this.paysForm.reset();
    }, err => {
      console.log(err);
    })
  }

  protected onDeletePays(id: number) {
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
  this.paysService.deletePays(id)
    .subscribe( data => {
      this.listPays.splice(id);
      this.router.navigateByUrl('/trf/pays');
    });
  }
      });
  }

}
