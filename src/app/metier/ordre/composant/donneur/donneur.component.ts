import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Motif } from '@app/metier/shared/models/motif';
import { Devise } from '@app/metier/shared/models/devise';
import { MotifService } from '@app/metier/shared/service/motif.service';
import { MarchandiseService } from '@app/metier/shared/service/marchandise.service';
import { Marchandise } from '@app/metier/shared/models/marchandise';
import { DeviseService } from '@app/metier/shared/service/devise.service';
import { ActiviteService } from '@app/metier/shared/service/activite.service';
import { Activite } from '@app/metier/shared/models/activite';
import { PaysService } from '@app/metier/shared/service/pays.service';
import { Pays } from '@app/metier/shared/models/pays';
import { OperationService } from '@app/metier/shared/service/operation.service';
import { MotifJustService } from '@app/metier/shared/service/motif-just.service';

@Component({
  selector: 'app-donneur',
  templateUrl: './donneur.component.html',
  styleUrls: ['./donneur.component.css']
})
export class DonneurComponent implements OnInit {

  protected operationForm: FormGroup;
  protected contreValeur: number;
  protected motifs: Motif[];
  protected devises: Devise[];
  protected marchandises: Marchandise[];
  protected activites: Activite[];
  protected documents: Document[];
  protected pays: Pays[];

  constructor(private formBuilder: FormBuilder, private operationService: OperationService,
    private toastrService: ToastrService, private motifService: MotifService, private marchandiseService: MarchandiseService,
    private deviseService: DeviseService, private activiteService: ActiviteService, private paysService: PaysService,
    private motifJustService: MotifJustService){
    this.operationForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      idMotif: [Validators.required],
      idDevise: [Validators.required],
      idMarchandise: [Validators.required],
      montant: [10000, Validators.required],
      intervenants: this.formBuilder.array([], Validators.required),
      documents: this.formBuilder.array([], [Validators.required])   
    });
    
  }

  ngOnInit() {
    this.getMotifs();
    this.getMarchandises();
    this.getDevises();
    this.getActivities(); 
    this.getPays();
    this.contreValeur = 1;
  }

  private getPays() {
    return this.paysService.listerPays()
    .pipe(first())
    .subscribe(data => {
      this.pays = data;
    })
  }

  private getMotifs() {
    return this.motifService.getAllMotifs()
    .pipe(first())
    .subscribe( data => {
      this.motifs = data;
    })
  }

  private getMarchandises() {
    return this.marchandiseService.getMarchandises()
    .pipe(first())
    .subscribe(data => {
      this.marchandises = data;
    })
  }

  private getDevises() {
    return this.deviseService.getDevises()
    .pipe(first())
    .subscribe(data => {
      this.devises = data;
    });
  }

  private getActivities() {
    return this.activiteService.getAllActivites()
    .pipe(first())
    .subscribe(data => {
      this.activites = data;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.operationForm.controls; }

 protected  addIntervenant() {
    const intervenants = this.operationForm.get('intervenants') as FormArray;
    console.log("add intervenant")
    intervenants.push(this.formBuilder.group({
      categorie: ['', Validators.required],
      name: ['   ', Validators.required],
      r_name: ['', Validators.required],
      banque: [''],
      r_banque: [Validators.required],
      idActivite: [],
      idPays: []
    }));
  }
  onCheckboxChange(e) {
    const documents: FormArray = this.operationForm.get('documents') as FormArray;

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

  protected onClack() {
    console.log("on click docs");
    return this.motifService.getMotifById(this.operationForm.get("idMotif").value)
    .pipe(first())
    .subscribe(data => {
      this.documents = data['justificatifs'];
    })
  }

  protected onClick() {
    console.log("on click docs");
    const idDevise = this.operationForm.get('idDevise').value;
    this.getDevise(idDevise);
    let mtnt = this.operationForm.get('montant').value * this.contreValeur;
    console.log(mtnt);
    return this.motifJustService.findByMotifAndObligatoire(this.operationForm.get('idMotif').value, this.operationForm.get('montant').value)
        .pipe(first())
    .subscribe(data => {
      this.documents = data;
    })
  }

  protected getDevise(id: number) {
    return this.deviseService.getDevise(id)
    .pipe(first())
    .subscribe(data => {
      this.contreValeur = data.contreValeur;
    });
  }

  public resetForm() {
    this.operationForm.reset();
  }

  public onFormSubmit() {
    console.log(this.operationForm.value);
    return this.operationService.saveOperation(this.operationForm.value)
    .pipe(first())
    .subscribe(data => {
      this.toastrService.success('Opération créée avec succès', 'Ecclesia') ;
    });
  }
 
}
