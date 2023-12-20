import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';

const routes: Routes = [
  {path: '', component: ClienteComponent},
  {path: 'novo', component: ClienteDetailComponent},
  {path: 'alterar/:id', component: ClienteDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
