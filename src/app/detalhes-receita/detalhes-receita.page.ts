import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensagensService } from '../services/mensagens.service';
import { ReceitasService } from '../services/receitas.service';
import { Receita } from '../services/entities/receita';
import { getDocumentDefinition, getFonts } from './template';
import pdfMake from 'pdfmake/build/pdfmake';
@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.page.html',
  styleUrls: ['./detalhes-receita.page.scss'],
})
export class DetalhesReceitaPage implements OnInit {
  public receita: Receita;
  public dataURL: string;
  public downloadLink: string;

  constructor(private router: Router, private receitasService: ReceitasService, private mensagensService: MensagensService) { }

  async ngOnInit() {
    await this.obterReceitaSelecionada();
  }

  async ionViewDidEnter() {
    await this.obterReceitaSelecionada();
  }

  private async obterReceitaSelecionada() {
    // TODO: Eliminar mocks
    if (!this.receita) {
      const receita = this.receitasService.getSelecionada();
      if (receita) {
        await this.atualizarDados(receita);
      } else {
        this.voltar();
      }
    }
  }

  private async atualizarDados(receita: Receita) {
    this.receita = receita;
    try {
      const response = await this.receitasService.gerarQRCode(this.receita._id);
      this.dataURL = response ? response : '';
    } catch (e) {
      this.mensagensService.erro('', 'Falha ao tentar gerar o QR Code da receita!');
      console.log(e);
    }
    const pdf = await this.gerarPdf(this.receita, this.dataURL);
    this.downloadLink = pdf;
  }

  private voltar() {
    this.router.navigate(['/lista-receitas']);
    this.mensagensService.erro('', 'Não foi possível obter os dados da receita selecionada!');
  }

  private gerarPdf(receita: Receita, qrcode: string): Promise<string> {
    pdfMake.fonts = getFonts();
    const documentDefinition = getDocumentDefinition(receita, qrcode);
    return new Promise(resolve => pdfMake.createPdf(documentDefinition).getBase64(data => resolve(`data:application/pdf;base64,${data}`)));
  }

  public async removerReceita() {
    const success = await this.receitasService.remover(this.receita._id);
    if (success) this.router.navigate(['/lista-receitas']);
  }

}
