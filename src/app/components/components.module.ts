import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BtnVoltarComponent } from './btn-voltar/btn-voltar.component';

@NgModule({
  declarations: [BtnVoltarComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  entryComponents: [],
  exports: [BtnVoltarComponent]
})
export class ComponentsModule { }
