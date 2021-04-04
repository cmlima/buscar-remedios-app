import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../services/receitas.service';
import { Receita } from '../services/entities/receita';
import { gerarInt } from '../services/mocks/random.js';
import { MensagensService } from '../services/mensagens.service';
@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.page.html',
  styleUrls: ['./detalhes-receita.page.scss'],
})
export class DetalhesReceitaPage implements OnInit {
  public receita: Receita;
  public dataURL: string;

  constructor(private receitaService: ReceitasService, private mensagensService: MensagensService) { }

  ngOnInit() {
    const receitas = this.receitaService.getReceitas();
    console.log('Receitas: ', receitas);
    this.receita = receitas[gerarInt(0, receitas.length - 1)];
    console.log(this.receita);
    this.receitaService.gerarQRCode(this.receita._id).then(dataURL => {
      this.dataURL = dataURL;
      console.log(this.dataURL);
    }).catch(e => {
      this.mensagensService.erro('Falha no QRCode', e.message);
    });
  }

  public async baixarReceita() {
    this.mensagensService.carregando('Carregando...', 5000, (aviso => {
      setTimeout(() => {
        console.log('baixado!');
        aviso.dismiss();
      }, 1000);
    }));
  }

  public async removerReceita() {
    this.mensagensService.confirmar('Confirmação', 'Tem certeza de que deseja remover a receita da memória do aparelho?', (yes: boolean) => {
      if (yes) {
        console.log('removendo...');
      }
    })
  }

}
