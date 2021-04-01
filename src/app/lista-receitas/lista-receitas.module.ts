import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnVoltarComponent } from '../components/btn-voltar/btn-voltar.component';

import { IonicModule } from '@ionic/angular';

import { ListaReceitasPageRoutingModule } from './lista-receitas-routing.module';

import { ListaReceitasPage } from './lista-receitas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaReceitasPageRoutingModule
  ],
  declarations: [ListaReceitasPage, BtnVoltarComponent]
})
export class ListaReceitasPageModule {}