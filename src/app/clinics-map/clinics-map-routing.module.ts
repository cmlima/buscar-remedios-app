import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicsMapPage } from './clinics-map.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicsMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicsMapPageRoutingModule {}
