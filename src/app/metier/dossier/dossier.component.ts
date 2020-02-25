import { Component, OnInit } from '@angular/core';
import { OperationService } from '../shared/service/operation.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Operation } from '../shared/models/operation';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css']
})
export class DossierComponent implements OnInit {

  protected operations: any[];
  constructor(private operationService: OperationService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.getAllOperations();
  }

  private getAllOperations() {
    return this.operationService.getOperations()
    .pipe(first())
    .subscribe(data => {
      this.operations = data;
    });
  }
}
