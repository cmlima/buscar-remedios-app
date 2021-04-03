import { Injectable } from '@angular/core';
import { Receita } from './entities/receita';
import { gerarReceitas } from './mocks/random.js'

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {
  private _receitas: Receita[] = gerarReceitas(10);
  
  constructor() { }

  public getReceitas() {
    return this._receitas;
  }

  public find(hash: string): Receita | false {
    console.log('Find: ', hash);
    return false;
  }

  public remove(hash: string) {
    console.log('Hash', hash);
  }
}
