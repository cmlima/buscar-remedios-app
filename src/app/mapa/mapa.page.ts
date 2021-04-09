import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { PostosService } from '../services/postos.service';
import { Localizacao, Posto } from '../services/entities';
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
	public map: Map;
	public cep: string; 

  constructor(private postosService: PostosService) { }

  ngOnInit() {}

  ionViewDidEnter() {
		if (!this.map) this.inicializarMapa();
  }

	private async inicializarMapa() {
		const attribution = 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
		const titleLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		const dadosMapa = await this.postosService.getDadosMapa();
		if (dadosMapa) {
			this.map = new Map('mapid').setView([dadosMapa.coordenadasIniciais.lat, dadosMapa.coordenadasIniciais.lng], 13);
			tileLayer(titleLayerUrl, {attribution}).addTo(this.map);
			this.renderizarPostos(dadosMapa.postosSaude);
		}
	}

	public async atualizarMapa() {
		const dadosMapa = await this.postosService.getDadosMapa(this.cep);
		if (dadosMapa) {
			this.map.setView([dadosMapa.coordenadasIniciais.lat, dadosMapa.coordenadasIniciais.lng], 13);
			this.renderizarPostos(dadosMapa.postosSaude);
		}
	}

	private renderizarPostos(postosSaude: Posto[]) {
		for (let posto of postosSaude) {
			let postoMarker = marker(
				[posto.coordenadas.lat, posto.coordenadas.lng]
			).addTo(this.map);

			postoMarker.bindTooltip(posto.nome);
		}
	}

}
