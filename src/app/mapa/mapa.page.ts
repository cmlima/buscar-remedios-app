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
	private cep: string;
	public map: Map;

  constructor(private postosService: PostosService) { }

  ngOnInit() {}

  ionViewDidEnter() {
		if (!this.map) this.inicializarMapa();
  }

  private atualizarCEP(cep: string) {
		this.cep = cep;
  	console.log('o cep digitado eh', cep);
		if (this.isCepValido(cep)) this.inicializarMapa(cep);
  }

	private isCepValido(cep: string): boolean {
		// TODO: implementar validacao
		return false;
	}

	private async inicializarMapa(cep?: string) {
		await this.postosService.getDadosMapa(cep);
  	const coordenadas = await this.postosService.getCoordenadas();
		if (coordenadas) {
			this.renderizarMapa(coordenadas);
			const postosSaude = await this.postosService.getPostosSaude();
			if (postosSaude) {
				this.renderizarPostos(postosSaude);
			}
		}
	}

	private renderizarMapa(coordenadas: Localizacao) {
		const attribution = 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
		const titleLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		this.map = new Map('mapid').setView([coordenadas.lat, coordenadas.lng], 13);
		tileLayer(titleLayerUrl, {attribution}).addTo(this.map);
	}

	private renderizarPostos(postosSaude: Posto[]) {
		for (let posto of postosSaude) {
			let postoMarker = marker(
				[posto.coordenadas.lat, posto.coordenadas.lng]
			).addTo(this.map);

			postoMarker.bindTooltip(posto.nome);
		}
	}

	public onChangeHandler(event: Event) {
		const target = event.target as HTMLInputElement;
		this.atualizarCEP(target.value);
	}

}
