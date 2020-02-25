import { Component, OnInit } from '@angular/core';
import { Justificatif } from '../shared/models/justificatif';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JustificatifService } from '../shared/service/justificatif.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-justificatif',
  templateUrl: './justificatif.component.html',
  styleUrls: ['./justificatif.component.css']
})
export class JustificatifComponent implements OnInit {

  protected justificatifs: Justificatif[];
  protected justificatifForm: FormGroup;
  pagedItems: Array<any>;

  constructor(private formBuilder: FormBuilder, private justificatifService: JustificatifService, 
    private router: Router, private toastrService: ToastrService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.justificatifForm = this.formBuilder.group({
      code: ['', Validators.required],
      libJustificatif: ['', Validators.required],
    });
    this.getAllJustificatifs();
  }

  beginPagination(pagedItems: Array<any>) {  
    this.pagedItems = pagedItems;  
  }
  
   // convenience getter for easy access to form fields
   get f() { return this.justificatifForm.controls; }

  private getAllJustificatifs() {
    return this.justificatifService.getAllJustificatifs()
    .subscribe(data => {
      this.justificatifs = data;
    }, error => {
    console.log(error);
    });
  }

  protected onSubmitForm() {
    return this.justificatifService.createActivite(this.justificatifForm.value)
    .pipe(first())
    .subscribe(res => {
      this.toastrService.success('Justificatif enregistrée avec succès');
      console.log(this.justificatifForm.value);
      this.justificatifForm.reset();
    }, error => {
      this.toastrService.error(error || 'Veuillez reéssayer plus tard', 'Application');
    });
  }

  onEditJustificatif(justificatif) {
    this.justificatifForm = this.formBuilder.group({
      code: [justificatif['code'], Validators.required],
      libJustificatif: [justificatif['libJustificatif'], Validators.required],
    });
  }

  onDeleteJustificatif(id: number) {
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
  this.justificatifService.deleteJustificatif(id)
    .subscribe( data => {
      this.justificatifs.splice(id);
      this.router.navigateByUrl('/trf/justificatifs');
    });
  }
      });
  }

}
