import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receita } from '../services/entities';
import { ReceitasService } from '../services/receitas.service';
@Component({
  selector: 'app-lista-receitas',
  templateUrl: './lista-receitas.page.html',
  styleUrls: ['./lista-receitas.page.scss'],
})
export class ListaReceitasPage implements OnInit {
  public receitas: Receita[];

  constructor(private router: Router, private receitasService: ReceitasService) { }

  async ngOnInit() {
    const receitas = await this.receitasService.getReceitas();
    if (receitas) this.receitas = receitas;
  }

  public resumoPrescricao(receita: Receita): string {
    return receita.prescricoes.map(item => item.medicamento).join(', ');
  }

  public verDetalhes(receita: Receita) {
    this.receitasService.selecionar(receita);
    this.router.navigate(['detalhes-receita']);
  }

  public remover(index: number) {
    this.receitasService.remover(this.receitas[index]._id);
  }
}
