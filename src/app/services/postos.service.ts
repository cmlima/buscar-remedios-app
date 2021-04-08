import { Injectable } from '@angular/core';
import { ApiMapa, Localizacao, Posto } from './entities';
import { MensagensService } from './mensagens.service';
import dadosMapaMock from './mocks/mapa.json';

@Injectable({
  providedIn: 'root'
})
export class PostosService {
  private dadosMapa: ApiMapa;
  private coordenadas: Localizacao;
  private postosSaude: Posto[];

  constructor(private mensagensService: MensagensService) { }

  public async getDadosMapa(cep?: string): Promise<boolean> {
    try {
      // TODO: implementar consumo API, com CEP opcional
      this.dadosMapa = dadosMapaMock;
      this.coordenadas = this.dadosMapa.coordenadasIniciais;
      this.postosSaude = this.dadosMapa.postosSaude; 
      return true;
    } catch (e) {
      this.mensagensService.erro('Falha ao obter dados do mapa', e.message);
      return false;
    }
  }

  public async getCoordenadas(): Promise<Localizacao | false> {
    const response = !this.dadosMapa ? await this.getDadosMapa() : true;
    if (response) return Promise.resolve(this.coordenadas);
    return Promise.resolve(false);
  }

  public async getPostosSaude(): Promise<Posto[] | false> {
    const response = !this.dadosMapa ? await this.getDadosMapa() : true;
    if (response) return Promise.resolve(this.postosSaude);
    return Promise.resolve(false);
  }

}
