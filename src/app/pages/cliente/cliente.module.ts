import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteComponent } from './cliente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PouiModule } from 'src/app/shared/poui/poui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClienteDetailComponent,
    ClienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    PouiModule
  ]
})
export class ClienteModule { }
