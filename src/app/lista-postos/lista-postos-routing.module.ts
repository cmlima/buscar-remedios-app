import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPostosPage } from './lista-postos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPostosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPostosPageRoutingModule {}
