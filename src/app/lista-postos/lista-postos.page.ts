import { Component, OnInit, Injectable } from '@angular/core';
import postosMock from '../services/mocks/mapa.json';
import { CallNumberService } from '../services/callNumber.service';
import { LaunchNavigatorService } from '../services/launchNav.service';


@Component({
  selector: 'app-lista-postos',
  templateUrl: './lista-postos.page.html',
  styleUrls: ['./lista-postos.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class ListaPostosPage implements OnInit {

  public ubsInfo = postosMock.postosSaude;

  constructor(private callNumber: CallNumberService, private launchNavigator: LaunchNavigatorService) { }

  ngOnInit() {}

  public realizarChamada(item: { telefone: string; }){
    this.callNumber.call(item.telefone);
  }

  public abrirAppNavegacao(item: { coordenadas: { lat: string; lng: string; }; nome: string; }){
    console.log("Coordenadas: " + item.coordenadas.lat + ", " + item.coordenadas.lng);

    this.launchNavigator.nav(item.nome);    
  }

}
