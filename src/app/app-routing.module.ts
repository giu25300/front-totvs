import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./pages/cliente/cliente.module').then((m)=>m.ClienteModule)
  },
  { path: '', component: AppComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
