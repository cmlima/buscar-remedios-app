import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaReceitasPage } from './lista-receitas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaReceitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaReceitasPageRoutingModule {}
