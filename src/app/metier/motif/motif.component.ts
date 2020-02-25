import { Component, OnInit } from '@angular/core';
import { Motif } from '../shared/models/motif';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MotifService } from '../shared/service/motif.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { JustificatifService } from '../shared/service/justificatif.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-motif',
  templateUrl: './motif.component.html',
  styleUrls: ['./motif.component.css']
})
export class MotifComponent implements OnInit {

  protected motifs: Motif[];
  protected motifForm: FormGroup;
  protected documentsData: [];
  protected documents: [];
  protected pagedItems: Array<any>;

  constructor(private formBuilder: FormBuilder, private motifService: MotifService, private toastrService: ToastrService,
    private justificatifService: JustificatifService, private router: Router, private authService: AuthenticationService) {
    // Create a FormControl for the select/unselect all checkbox
      this.motifForm = this.formBuilder.group({
        libMotif: ['', Validators.required],
        documents:this.formBuilder.array([], [Validators.required]),
      });
   }

  ngOnInit() {
    this.getAllJustificatif();
    this.getAllMotifs();
  }

   // convenience getter for easy access to form fields
   get f() { return this.motifForm.controls; }

  beginPagination(pagedItems: Array<any>) {  
    this.pagedItems = pagedItems;  
  } 
  onCheckboxChange(e) {
    const documents: FormArray = this.motifForm.get('documents') as FormArray;

    if (e.target.checked) {
      documents.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      documents.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          documents.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  protected getAllMotifs() {
    return this.motifService.getAllMotifs()
    .subscribe(data => {
      this.motifs = data;
    }, error => {
    console.log(error);
    });
  }

  private getAllJustificatif() {
    return this.justificatifService.getAllJustificatifs()
    .subscribe(data => {
      this.documentsData = data;
    });
  }
  
  protected onSubmit() {
    console.log(this.motifForm.value)
    return this.motifService.createActivite(this.motifForm.value)
    .pipe(first())
    .subscribe(res => {
      this.toastrService.success('Justificatif enregistrée avec succès');
      this.motifForm.reset();
    }, error => {
      this.toastrService.error(error || 'Veuillez reéssayer plus tard', 'Application');
    });
  }

  onEditModif(motif) {
    this.motifForm = this.formBuilder.group({
      libMotif: ['', Validators.required],
      documents:this.formBuilder.array([], [Validators.required]),
    });
  }

  protected onDeleteMotif(id: number) {
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
  this.motifService.deleteActivite(id)
    .subscribe( data => {
      this.motifs.splice(id);
      this.router.navigateByUrl('/trf/justificatifs');
    });
  }
      });
  }

}
