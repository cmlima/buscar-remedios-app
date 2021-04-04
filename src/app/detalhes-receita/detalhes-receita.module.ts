import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetalhesReceitaPageRoutingModule } from './detalhes-receita-routing.module';
import { ComponentsModule } from '../components/components.module';

import { DetalhesReceitaPage } from './detalhes-receita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesReceitaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalhesReceitaPage]
})
export class DetalhesReceitaPageModule {}
