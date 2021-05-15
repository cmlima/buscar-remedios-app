import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Receita } from './entities';
import { ApiErro } from './entities';
import QRCode from 'qrcode';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {
  private _receitas: Receita[] = [];
  private _selecionada: Receita;
  private apiBaseUrl: string = "https://remedios-api.herokuapp.com";

  constructor(private mensagensService: MensagensService, private httpClient: HttpClient, private storage: Storage) { }

  public async getReceitas(): Promise<Receita[] | false> {
    try {
      return this._receitas.sort((a, b) => {
        const aValue = Number(a.data.split('/').reverse().join(''));
        const bValue = Number(b.data.split('/').reverse().join(''));
        return bValue - aValue;
      });
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

  public async buscar(id: string): Promise<Receita | false> {
    console.log('Buscando... ', id);

    const url = `${this.apiBaseUrl}/receitas/${id}`;
    const response = await this.httpClient.get(url).toPromise() as Receita | ApiErro;

    const invalido = (response as ApiErro).error; 
    if (invalido) {
      await this.mensagensService.erro('', 'Receita não localizada!');
      return Promise.resolve(false);
    }
    
    const receita = response as Receita;

    let receitaInd = this._receitas.findIndex(r => r._id == receita._id);
    if (receitaInd == -1) { receitaInd = this._receitas.length; }

    this._receitas[receitaInd] = receita;
    await this.storage.set('receitas', this._receitas);
    return await Promise.resolve(receita);
  }

  public async remover(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.mensagensService.confirmar('Confirmação', 'Tem certeza de que deseja remover a receita da memória do aparelho?', async (yes: boolean) => {
        if (yes) {
          console.log('removendo... ', id);
          const index = this._receitas.findIndex(receita => receita._id === id);
          console.log('data: ', this._receitas[index].data);
          this._receitas.splice(index, 1);
          await this.storage.set('receitas', this._receitas);
        }
        resolve(yes);
      });
    })
  }

  public async gerarQRCode(id: string): Promise<string | false> {
    try {
      return await QRCode.toDataURL(id);
    } catch (e) {
      await this.mensagensService.erro('', 'Falha na leitura do QRCode!');
      console.log(e);
      return false;
    }
  }
  
  public async atualizarStorage () {
    let receitas = await this.storage.get('receitas') || [];
    if (receitas.length == 0) {
      return await this.storage.set('receitas', receitas);
    }

    receitas = await this.buscarVarias(receitas.map(r => r._id)) || [];

    this._receitas = receitas;
    await this.storage.set('receitas', receitas);
  }

  private async buscarVarias(ids: string[]): Promise<Receita[] | false> {
    console.log('Buscando receitas ', ids);

    const url = `${this.apiBaseUrl}/receitas?ids=${ids.join(',')}`;
    const response = await this.httpClient.get(url).toPromise() as Receita[] | ApiErro;

    const invalido = (response as ApiErro).error; 
    if (invalido) {
      return Promise.resolve(false);
    }
    
    const receitas = response as Receita[];
    return await Promise.resolve(receitas);
  }
}
