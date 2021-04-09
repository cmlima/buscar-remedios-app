import { Component, OnInit } from '@angular/core';
import { CallNumberService } from '../services/callNumber.service';
import { LaunchNavigatorService } from '../services/launchNav.service';
import { PostosService } from '../services/postos.service';
import { Posto } from '../services/entities';
@Component({
  selector: 'app-lista-postos',
  templateUrl: './lista-postos.page.html',
  styleUrls: ['./lista-postos.page.scss'],
})
export class ListaPostosPage implements OnInit {
  public postos: Posto[] = [];

  constructor(private callNumber: CallNumberService, private launchNavigator: LaunchNavigatorService, private postosService: PostosService) { }

  async ngOnInit() {
    // TODO: refatorar para que os dados dos postos seja
    // passado pelo componente mapa via router
    const response = await this.postosService.getDadosMapa();
    if (response) this.postos = response.postosSaude;
  }

  public realizarChamada(posto: Posto) {
    this.callNumber.call(posto.telefone);
  }

  public abrirAppNavegacao(posto: Posto) {
    console.log("Coordenadas: " + posto.coordenadas.lat + ", " + posto.coordenadas.lng);
    this.launchNavigator.nav(posto.nome);    
  }

}
