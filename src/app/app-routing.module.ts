import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lista-receitas',
    loadChildren: () => import('./lista-receitas/lista-receitas.module').then( m => m.ListaReceitasPageModule)
  },
  {
    path: 'detalhes-receita',
    loadChildren: () => import('./detalhes-receita/detalhes-receita.module').then( m => m.DetalhesReceitaPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'lista-postos',
    loadChildren: () => import('./lista-postos/lista-postos.module').then( m => m.ListaPostosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
