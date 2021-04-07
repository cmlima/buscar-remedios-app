import { Injectable } from '@angular/core';
import { Receita } from './entities/receita';
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
    return this._receitas;
  }

  public buscar(hash: string): Receita | false {
    console.log('Buscando... ', hash);
    return false;
  }

  public remover(hash: string) {
    this.mensagensService.confirmar('Confirmação', 'Tem certeza de que deseja remover a receita da memória do aparelho?', (yes: boolean) => {
      if (yes) {
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
