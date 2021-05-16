import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiCepErro, ApiCepEndereco, ApiMapa, Localizacao, Posto, ApiErro } from './entities';
import { MensagensService } from './mensagens.service';
import dadosMapaMock from './mocks/mapa.json';

@Injectable({
  providedIn: 'root'
})
export class PostosService {
  public dadosMapa: ApiMapa;
  private apiBaseUrl: string = "https://remedios-api.herokuapp.com";

  constructor(private mensagensService: MensagensService, private httpClient: HttpClient, private geolocation: Geolocation) { }

  public async getDadosMapa(cep?: string): Promise<ApiMapa | false> {
    try {
      // TODO: implementar consumo API, com CEP opcional
      // incluindo obtenção dos dados dos postos mais 
      // próximos a partir da localização
      
      let url = `${this.apiBaseUrl}/postos`;

      if (cep) {
        const endereco = await this.validarCEP(cep);
        // TODO: Implementar rotina para obter coordenadas
        // a partir do CEP
        if (!endereco) { return; }

        url += `?cep=${cep}`;
      } else {
        const localizacao = await this.obterGeolocalizacao();
        if (!localizacao) {return;}
        
        url += `?lat=${localizacao.lat}&lng=${localizacao.lng}`;
      }

      const response = await this.httpClient.get(url).toPromise() as ApiMapa | ApiErro;

      const invalido = (response as ApiErro).error; 
      if (invalido) {
        await this.mensagensService.erro('', 'Falha ao obter dados do mapa!');
        return Promise.resolve(false);
      }

      const responseObj = response as ApiMapa;
      this.dadosMapa = responseObj;
      return responseObj;
    } catch (e) {
      this.mensagensService.erro('', 'Falha ao obter dados do mapa!');
      console.log(e);
      return false;
    }
  }

  private async validarCEP(cep: string): Promise<ApiCepEndereco | false> {
    const digitos = cep.replace(/[^\d]/, '');
    if (!/^\d{8}$/.test(digitos)) {
      this.mensagensService.erro('', 'CEP inválido!');
      return false;
    }
    /**
     * Referência sobre a API do serviço de CEP:
     * https://viacep.com.br/
     */
    const url = `https://viacep.com.br/ws/${digitos}/json/`;
    const response = await this.httpClient.get(url).toPromise() as ApiCepEndereco | ApiCepErro;
    // console.log(response);
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
      this.mensagensService.erro('', 'Não possível encontrar a sua localização atual. Digite um CEP na caixa de busca.');
      return false;
    }
  }

  public getPostos(): Posto[] {
    return (this.dadosMapa || {}).postosSaude || [];
  }
}
