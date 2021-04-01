import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  declarations: [ListaPostosPage]
})
export class ListaPostosPageModule {}
