import { Injectable } from '@angular/core';
import { Receita } from './entities';
import { gerarReceita, gerarReceitas } from './mocks/random.js';
import QRCode from 'qrcode';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {
  // TODO: excluir mock
  private _receitas: Receita[] = gerarReceitas(10);
  private _selecionada: Receita;
  
  constructor(private mensagensService: MensagensService) { }

  public async getReceitas(): Promise<Receita[] | false> {
    // TODO: implementar leitura do storage local
    try {
      return await Promise.resolve(this._receitas.sort((a, b) => {
        const aValue = Number(a.data.split('/').reverse().join(''));
        const bValue = Number(b.data.split('/').reverse().join(''));
        return bValue - aValue;
      }));
    } catch (e) {
      this.mensagensService.erro('Falha na recuperação das receitas', e.message);
      return false;
    }
  }

  public getSelecionada(): Receita | false {
    console.log(this._selecionada);
    if (this._selecionada) return this._selecionada;
    return false;
  }

  public selecionar(receita: Receita) {
    this._selecionada = receita;
  }

  public async buscar(hash: string): Promise<Receita | false> {
    // TODO: Implementar consumo API remota, 
    // atualizando vetor de receitas em caso de sucesso
    // ou retornando mensagem de erro em caso de insucesso
    console.log('Buscando... ', hash);
    const receita = gerarReceita();
    if (receita) {
      this._receitas.push(receita);
      return await Promise.resolve(receita);
    }
    await this.mensagensService.erro('', 'Receita não localizada!');
    return Promise.resolve(false);
  }

  public async remover(hash: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.mensagensService.confirmar('Confirmação', 'Tem certeza de que deseja remover a receita da memória do aparelho?', (yes: boolean) => {
        if (yes) {
          // TODO: implementar remoção do storage local
          console.log('removendo... ', hash);
          const index = this._receitas.findIndex(receita => receita._id === hash);
          console.log('data: ', this._receitas[index].data);
          this._receitas.splice(index, 1);
        }
        resolve(yes);
      });
    })
  }

  public async gerarQRCode(hash: string): Promise<string | false> {
    try {
      return await QRCode.toDataURL(hash);
    } catch (e) {
      await this.mensagensService.erro('Falha no QRCode', e.message);
      return false;
    }
  }
  
}
