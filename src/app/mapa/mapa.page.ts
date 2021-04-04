import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import mapaMock from '../services/mocks/mapa.json';

/*
	Referências leaflet
	https://leafletjs.com/reference-1.7.1.html
	https://medium.com/@bviveksingh96/using-leaflet-with-ionic-4-f7acbd1c2464
*/

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

	public map:Map;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.inicializarMapa();
  }

  inicializarMapa () {
  	const attribution = 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
  	const titleLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  	const coordenadasIniciais = mapaMock.coordenadasIniciais;
  	const postosSaude = mapaMock.postosSaude;

  	this.map = new Map("mapid").setView([coordenadasIniciais.lat, coordenadasIniciais.lng], 13);

  	tileLayer(titleLayerUrl, {attribution}).addTo(this.map);

  	for (let posto of postosSaude) {
	  	let postoMarker = marker(
	  		[posto.coordenadas.lat, posto.coordenadas.lng]
  		).addTo(this.map);

  		postoMarker.bindTooltip(posto.nome);
  	}
  }

  atualizarCEP(cep) {
  	console.log('o cep digitado eh', cep);
  }
}
