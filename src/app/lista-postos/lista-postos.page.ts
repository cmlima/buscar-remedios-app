import { Component, OnInit } from '@angular/core';
import postosMock from '../services/mocks/mapa.json';

@Component({
  selector: 'app-lista-postos',
  templateUrl: './lista-postos.page.html',
  styleUrls: ['./lista-postos.page.scss'],
})
export class ListaPostosPage implements OnInit {

  public ubsInfo = postosMock.postosSaude;

  constructor() { }

  ngOnInit() {}

  public abrirAppNavegacao(item){
    console.log("Coordenadas: " + item.coordenadas.lat + ", " + item.coordenadas.lng);
  }

}
