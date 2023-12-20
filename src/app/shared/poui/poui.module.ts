import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoFieldModule, PoButtonModule, PoNotificationModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoFieldModule,
    PoButtonModule,
    PoNotificationModule
  ],
  exports: [
    PoFieldModule,PoButtonModule,PoNotificationModule
  ]
})
export class PouiModule { }
