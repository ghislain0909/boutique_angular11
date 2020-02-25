import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Activite } from '../shared/models/activite';
import { ActiviteService } from '../shared/service/activite.service';
import swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  protected activites: Activite[];
  protected activiteForm: FormGroup;
  protected idActivite: number;
  pagedItems: Array<any>; 

  pageOfItems: Array<any>;

  constructor(private formBuilder: FormBuilder, private activiteService: ActiviteService, public authService : AuthenticationService,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.activiteForm = this.formBuilder.group({
      secteur: ['', Validators.required],
      libActivite: ['', Validators.required]
    });
    this.getActivities();
  }

  beginPagination(pagedItems: Array<any>) {  
    this.pagedItems = pagedItems;  
  } 

  public getActiviteInfo() {
    this.activiteService.getActiviteById(this.idActivite)
    .subscribe(data => {
      this.activiteForm = this.formBuilder.group({
        nom: [data['nom'], Validators.required],
        saintPatron: [data['saintPatron'], Validators.required],
        diocese: [data['diocese'], Validators.required],
        description: [data['description'], Validators.required]
      });
    });
  }

     // convenience getter for easy access to form fields
     get f() { return this.activiteForm.controls; }

  protected getActivities() {
    return this.activiteService.getAllActivites()
    .pipe(first())
    .subscribe(res => {
      this.activites = res;
    }, err => {
      console.log(err);
    })
  }

  protected onFormSubmit() {
    console.log(this.activiteForm.value);
    return this.activiteService.createActivite(this.activiteForm.value)
    .pipe(first())
    .subscribe( data => {
      this.toastrService.success('Activité enregistrée avec succès');
      this.activiteForm.reset();
    }, error => {
      this.toastrService.error(error || 'Veuillez reéssayer plus tard', 'Application');
    });
  }

  protected onEditActivity(activite) {
    this.activiteForm = this.formBuilder.group({
      idActivite: [activite.id],
      secteur: [activite.secteur, Validators.required],
      libActivite: [activite.libActivite, Validators.required]
    });
  }

  onDeleteActivity(id: number) {
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
  this.activiteService.deleteActivite(id)
    .subscribe( data => {
      this.activites.splice(id);
      this.router.navigateByUrl('/trf/activites');
    });
  }
      });
  }

}
