import { Component,Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { MotifJust } from '../shared/models/motif-ust';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JustificatifService } from '../shared/service/justificatif.service';
import { MotifService } from '../shared/service/motif.service';
import { Justificatif } from '../shared/models/justificatif';
import { first } from 'rxjs/operators';
import { MotifJustService } from '../shared/service/motif-just.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-motif-just',
  templateUrl: './motif-just.component.html',
  styleUrls: ['./motif-just.component.css']
})
export class MotifJustComponent implements OnInit, OnChanges {

  protected motifs: MotifJust[];
  protected motifsJust: MotifJust[];
  protected motifForm: FormGroup;
  protected justificatifs: Justificatif[];
  pagedItems: Array<any>;  

  constructor(private justificatifService: JustificatifService, private motifService: MotifService,
    private formBuilder: FormBuilder, private motifJustService: MotifJustService, private toastrService: ToastrService,
    private authService: AuthenticationService) { 
    }

  ngOnInit() {
    this.motifForm = this.formBuilder.group({
      idMotif: [Validators.required],
      idJustificatif: [Validators.required],
      obligatoire: [],
      optionel: []
    });
    this.getJustificatifs();
    this.getMotifs();
    this.listerAll();
  }

  beginPagination(pagedItems: Array<any>) {  
    this.pagedItems = pagedItems;  
  } 

  ngOnChanges(changes: SimpleChanges) {
    
  }

   // convenience getter for easy access to form fields
   get f() { return this.motifForm.controls; }

  private getJustificatifs() {
    return this.justificatifService.getAllJustificatifs()
    .pipe(first())
    .subscribe(data => {
      this.justificatifs = data;
    }, err => {
      console.log(err);
    })
  }

  private getMotifs() {
    return this.motifService.getAllMotifs()
    .pipe(first())
    .subscribe(data => {
      this.motifs = data;
    }, err => {
      console.log(err);
    })
  }

  public onSubmit() {
    return this.motifJustService.createJustByMotif(this.motifForm.value)
    .pipe(first())
    .subscribe(data => {
      this.toastrService.success("Enregistrement effectué")
      this.motifForm.reset();
    }, err => {
      console.log(err);
    })
  }

  private listerAll() {
    return this.motifJustService.getAll()
    .pipe(first())
    .subscribe(data => {
      this.motifsJust = data;
    }, err => {
      console.log(err);
    })
  }

}
