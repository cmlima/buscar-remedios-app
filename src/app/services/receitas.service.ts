import { Injectable } from '@angular/core';
import { Receita } from './entities';
import { gerarReceitas } from './mocks/random.js';
import QRCode from 'qrcode';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {
  private _receitas: Receita[] = gerarReceitas(10);
  
  constructor(private mensagensService: MensagensService) { }

  public getReceitas() {
    // TODO: implementar leitura do storage local
    return this._receitas;
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
