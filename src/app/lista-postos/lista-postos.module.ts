import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnVoltarComponent } from '../components/btn-voltar/btn-voltar.component';

import { IonicModule } from '@ionic/angular';

import { ListaPostosPageRoutingModule } from './lista-postos-routing.module';

import { ListaPostosPage } from './lista-postos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPostosPageRoutingModule
  ],
  declarations: [ListaPostosPage, BtnVoltarComponent]
})
export class ListaPostosPageModule {}
