import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnVoltarComponent } from '../components/btn-voltar/btn-voltar.component';

import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';

import { MapaPage } from './mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule
  ],
  declarations: [MapaPage, BtnVoltarComponent]
})
export class MapaPageModule {}
