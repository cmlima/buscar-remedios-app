import { Injectable } from '@angular/core';
import { Receita } from './entities';
import { gerarInt, gerarReceitas } from './mocks/random.js';
import QRCode from 'qrcode';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {
  private _receitas: Receita[] = [];
  private _selecionada: Receita;
  
  constructor(private mensagensService: MensagensService) { }

  public async getReceitas(): Promise<Receita[] | false> {
    // TODO: implementar leitura do storage local
    try {
      this._receitas = gerarReceitas(10).sort((a, b) => {
        return Number(b.data.split('/').reverse().join()) - Number(a.data.split('/').reverse().join());
      })      
      return await Promise.resolve(this._receitas);
    } catch (e) {
      this.mensagensService.erro('Falha na recuperação das receitas', e.message);
      return false;
    }
  }

  public getSelecionada(): Receita {
    // TODO: Eliminar mock
    return this._selecionada ? this._selecionada : this._receitas[gerarInt(0, this._receitas.length - 1)];
  }

  public selecionar(receita: Receita) {
    this._selecionada = receita;
  }

  public async buscar(hash: string) {
    // TODO: Implementar consumo API remota, 
    // atualizando vetor de receitas em caso de sucesso
    // ou retornando mensagem de erro em caso de insucesso
    console.log('Buscando... ', hash);
  }

  public remover(hash: string) {
    this.mensagensService.confirmar('Confirmação', 'Tem certeza de que deseja remover a receita da memória do aparelho?', (yes: boolean) => {
      if (yes) {
        // TODO: implementar remoção do storage local
        console.log('removendo... ', hash);
      }
    })
  }

  public async gerarQRCode(hash: string): Promise<string | false> {
    try {
      return await QRCode.toDataURL(hash);
    } catch (e) {
      this.mensagensService.erro('Falha no QRCode', e.message);
      return false;
    }
  }
  
}
