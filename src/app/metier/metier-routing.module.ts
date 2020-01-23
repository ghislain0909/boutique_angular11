import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from '../template/template.component';
import { DossierComponent } from './dossier/dossier.component';
import { OrdreComponent } from './ordre/ordre.component';
import { DonneurComponent } from './ordre/composant/donneur/donneur.component';
import { BeneficiaireComponent } from './ordre/composant/beneficiaire/beneficiaire.component';
import { OperationComponent } from './ordre/composant/operation/operation.component';
import { ActiviteComponent } from './activite/activite.component';
import { MotifComponent } from './motif/motif.component';
import { JustificatifComponent } from './justificatif/justificatif.component';


const routes: Routes = [
  
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    component: TemplateComponent,
    children: [
    
      {
        path: 'ordre',
        component: OrdreComponent,
        children: [
          {
            path: 'donneur',
            component: DonneurComponent
          },
          {
            path: 'beneficiaire',
            component: BeneficiaireComponent
          },
          {
            path: 'operation',
            component: OperationComponent
          }
        ]
      },
      {
        path: 'list',
        component: DossierComponent
      },
      {
        path:'activites',
        component: ActiviteComponent
      },
      {
        path: 'motif',
        component: MotifComponent
      },
      {
        path: 'justificatif',
        component: JustificatifComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetierRoutingModule { }
