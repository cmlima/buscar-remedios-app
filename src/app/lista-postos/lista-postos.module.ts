import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaPostosPageRoutingModule } from './lista-postos-routing.module';
import { ComponentsModule } from '../components/components.module';

import { ListaPostosPage } from './lista-postos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPostosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaPostosPage]
})
export class ListaPostosPageModule {}
