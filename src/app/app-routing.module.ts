import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { UpdateComponent } from './core/update/update.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 {
   path: '',
   component: AppComponent,
   children: [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'update',
      component: UpdateComponent
    },
   ]
 },
 {
   path: 'trf',
   loadChildren: () => import('./metier/metier.module').then(mod => mod.MetierModule),
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
