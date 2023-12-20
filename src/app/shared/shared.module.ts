import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PouiModule } from './poui/poui.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PouiModule, FormsModule
  ],
  exports: [
    PouiModule
  ]
})
export class SharedModule {}
