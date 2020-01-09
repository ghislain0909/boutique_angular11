import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetierRoutingModule } from './metier-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DossierComponent } from './dossier/dossier.component';
import { HeaderComponent } from '../template/header/header.component';
import { SidebarComponent } from '../template/sidebar/sidebar.component';
import { FooterComponent } from '../template/footer/footer.component';
import { TemplateComponent } from '../template/template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdreComponent } from './ordre/ordre.component';
import { NavbarComponent } from './ordre/navbar/navbar.component';
import { DonneurComponent } from './ordre/composant/donneur/donneur.component';
import { BeneficiaireComponent } from './ordre/composant/beneficiaire/beneficiaire.component';
import { OperationComponent } from './ordre/composant/operation/operation.component';
import { SummaryComponent } from './ordre/composant/summary/summary.component';


@NgModule({
  declarations: [
    DashboardComponent,
     DossierComponent,
     HeaderComponent,
     SidebarComponent,
     FooterComponent,
     TemplateComponent,
     OrdreComponent,
     NavbarComponent,
     DonneurComponent,
     BeneficiaireComponent,
     OperationComponent,
     SummaryComponent,
    ],
  imports: [
    CommonModule,
    MetierRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    TemplateComponent
  ]
})
export class MetierModule { }
