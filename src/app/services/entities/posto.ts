import type { Localizacao } from './localizacao';

export interface Posto {
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  telefone: string;
  distancia: string;
  coordenadas: Localizacao
}
