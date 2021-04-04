import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicsMapPageRoutingModule } from './clinics-map-routing.module';

import { ClinicsMapPage } from './clinics-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicsMapPageRoutingModule
  ],
  declarations: [ClinicsMapPage]
})
export class ClinicsMapPageModule {}
