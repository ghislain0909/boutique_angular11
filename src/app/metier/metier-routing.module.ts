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
import { MarchandiseComponent } from './marchandise/marchandise.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { DeviseComponent } from './devise/devise.component';
import { PaysComponent } from './pays/pays.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { MotifJustComponent } from './motif-just/motif-just.component';
import { AnalyseComponent } from './analyse/analyse.component';


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
            path: '',
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
        path: 'motifs',
        component: MotifComponent
      },
      {
        path: 'pays',
        component: PaysComponent
      },
      {
        path: 'devises',
        component: DeviseComponent
      },
      {
        path: 'justificatifs',
        component: JustificatifComponent
      },
      {
        path: 'just--motifs',
        component: MotifJustComponent
      },
      {
        path: 'marchandises',
        component: MarchandiseComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'register',
        component: NewUserComponent
      },
      {
        path: 'update-role',
        component: RoleUpdateComponent
      }, 
      {
        path: 'analyze',
        component: AnalyseComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetierRoutingModule { }
