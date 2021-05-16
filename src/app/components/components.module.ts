import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BtnVoltarComponent } from './btn-voltar/btn-voltar.component';

import { NameCasePipe, SentenceCasePipe, MToKmPipe } from '../services/custom-pipes';
@NgModule({
  declarations: [BtnVoltarComponent, NameCasePipe, SentenceCasePipe, MToKmPipe],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  entryComponents: [],
  exports: [BtnVoltarComponent, NameCasePipe, SentenceCasePipe, MToKmPipe]
})
export class ComponentsModule { }
