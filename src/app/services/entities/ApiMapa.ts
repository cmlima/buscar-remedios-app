import type { Localizacao } from './localizacao';
import type { Posto } from './posto';

export interface ApiMapa {
	coordenadasIniciais: Localizacao,
	postosSaude: Posto[]
}
