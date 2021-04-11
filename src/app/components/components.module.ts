import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BtnVoltarComponent } from './btn-voltar/btn-voltar.component';

import { NameCasePipe, SentenceCasePipe } from '../services/custom-pipes';
@NgModule({
  declarations: [BtnVoltarComponent, NameCasePipe, SentenceCasePipe],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  entryComponents: [],
  exports: [BtnVoltarComponent, NameCasePipe, SentenceCasePipe]
})
export class ComponentsModule { }
