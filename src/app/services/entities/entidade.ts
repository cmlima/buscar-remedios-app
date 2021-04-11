import type { UF } from './types';

export interface Entidade {
  nome: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  uf: UF;
  cep: string;
  logo: string;
}
