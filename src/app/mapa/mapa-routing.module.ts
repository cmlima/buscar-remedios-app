import { ListaReceitasPageModule } from './../lista-receitas/lista-receitas.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaPage } from './mapa.page';

const routes: Routes = [
  {
    path: '',
    component: MapaPage
  },
  {
    path: 'lista-receitas',
    component: ListaReceitasPageModule


  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaPageRoutingModule {}


