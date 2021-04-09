import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensagensService } from '../services/mensagens.service';
import { ReceitasService } from '../services/receitas.service';
import { Receita } from '../services/entities/receita';

@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.page.html',
  styleUrls: ['./detalhes-receita.page.scss'],
})
export class DetalhesReceitaPage implements OnInit {
  public receita: Receita;
  public dataURL: string;
  // https://www.labnol.org/internet/direct-links-for-google-drive/28356/
  public downloadLink: string = 'https://drive.google.com/uc?export=download&id=1yfrXjlyzikuYsZai2sv-eoF0UuK9Srr-';

  constructor(private router: Router, private receitasService: ReceitasService, private mensagensService: MensagensService) { }

  async ngOnInit() {
    // TODO: Eliminar mocks
    const receita = this.receitasService.getSelecionada();
    if (receita) {
      await this.atualizarDados(receita);
    } else {
      this.voltar();
    }
  }

  // async ionViewWillEnter() {
  //   const receita = this.receitasService.getSelecionada();
  //   if (receita) {
  //     await this.atualizarDados(receita);
  //   } else {
  //     this.voltar();
  //   }
  // }

  private async atualizarDados(receita: Receita) {
    this.receita = receita;
    const response = await this.receitasService.gerarQRCode(this.receita._id);
    this.dataURL = response ? response : '';
  }

  private voltar() {
    this.mensagensService.erro('Dados inexistentes', 'Não foi possível obter os dados da receita selecionada!');
    this.router.navigate(['/lista-receitas']);
  }

  public async removerReceita() {
    const success = await this.receitasService.remover(this.receita._id);
    if (success) this.router.navigate(['/lista-receitas']);
  }

}
