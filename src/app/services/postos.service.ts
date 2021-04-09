import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiCepErro, ApiCepEndereco, ApiMapa, Localizacao, Posto } from './entities';
import { MensagensService } from './mensagens.service';
import dadosMapaMock from './mocks/mapa.json';

@Injectable({
  providedIn: 'root'
})
export class PostosService {
  public dadosMapa: ApiMapa;

  constructor(private mensagensService: MensagensService, private httpClient: HttpClient, private geolocation: Geolocation) { }

  public async getDadosMapa(cep?: string): Promise<ApiMapa | false> {
    try {
      // TODO: implementar consumo API, com CEP opcional
      // incluindo obtenção dos dados dos postos mais 
      // próximos a partir da localização 
      if (cep) {
        const endereco = await this.validarCEP(cep);
        // TODO: Implementar rotina para obter coordenadas
        // a partir do CEP
        if (endereco) this.dadosMapa = dadosMapaMock;        
      } else {
        const localizacao = this.obterGeolocalizacao();
        this.dadosMapa = dadosMapaMock; 
      }
      return this.dadosMapa;
    } catch (e) {
      this.mensagensService.erro('Falha ao obter dados do mapa', e.message);
      return false;
    }
  }

  private async validarCEP(cep: string): Promise<ApiCepEndereco | false> {
    const digitos = cep.replace(/[^\d]/, '');
    if (!/^\d{8}$/.test(cep)) {
      this.mensagensService.erro('', 'CEP inválido!');
      return false;
    }
    /**
     * Referência sobre a API do serviço de CEP:
     * https://viacep.com.br/
     */
    const url = `https://viacep.com.br/ws/${digitos}/json/`;
    const response = await this.httpClient.get(url).toPromise() as ApiCepEndereco | ApiCepErro;
    console.log(response);
    const invalido = (response as ApiCepErro).erro; 
    if (invalido) {
      this.mensagensService.erro('', 'CEP inválido!');
      return false;
    }
    return response as ApiCepEndereco;
  }

  private async obterGeolocalizacao(): Promise<Localizacao | false> {
    try {
      const response = await this.geolocation.getCurrentPosition();
      console.log(response);
      return {
        lat: response.coords.latitude,
        lng: response.coords.longitude
      }
    } catch (e) {
      this.mensagensService.erro('Erro na localização', 'Não possível encontrar a sua localização atual. Digite um CEP na caixa de busca.');
      return false;
    }
  }
}
