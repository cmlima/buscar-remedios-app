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
  public receitas: Receita[] = [];
  public filtradas: Receita[] = [];
  public filtro: string = 'todas';
  public canceladas: number = 0;

  constructor(private router: Router, private receitasService: ReceitasService) { }

  async ngOnInit() {}

  async ionViewDidEnter() {
    await this.atualizarReceitas();
  }

  public async atualizarReceitas() {
    await this.receitasService.atualizarStorage();

    const receitas = await this.receitasService.getReceitas();
    if (receitas) this.receitas = receitas;
    this.filtrar();
  }

  public mudarFiltro(event: Event) {
    this.filtro = (event as CustomEvent).detail.value;
    this.filtrar();
  }

  public filtrar() {
    let canceladas = 0;
    this.filtradas = this.receitas.filter(receita => {
      if (receita.cancelled) canceladas++;
      if (this.filtro === 'todas') return true;
      return this.filtro === 'canceladas' ? receita.cancelled : !receita.cancelled;
    });
    this.canceladas = canceladas;
  }

  public resumoPrescricao(receita: Receita): string {
    return receita.prescricoes.map(item => item.medicamento).join(', ');
  }

  public verDetalhes(receita: Receita) {
    this.receitasService.selecionar(receita);
    this.router.navigate(['detalhes-receita']);
  }

  public async remover(receita: Receita) {
    const removed = await this.receitasService.remover(receita._id);
    if (removed) await this.atualizarReceitas();
  }

  public async refresh(event) {
    await this.receitasService.atualizarStorage();
    event.target.complete();
  }
}
