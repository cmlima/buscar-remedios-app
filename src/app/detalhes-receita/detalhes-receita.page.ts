import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../services/receitas.service';
import { Receita } from '../services/entities/receita';
import { gerarInt } from '../services/mocks/random.js';

@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.page.html',
  styleUrls: ['./detalhes-receita.page.scss'],
})
export class DetalhesReceitaPage implements OnInit {
  private receita: Receita;

  constructor(private receitaService: ReceitasService) { }

  ngOnInit() {
    const receitas = this.receitaService.getReceitas();
    console.log('Receitas: ', receitas);
    this.receita = receitas[gerarInt(0, receitas.length - 1)];
    console.log(this.receita);
  }

}
