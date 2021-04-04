import type { Especialidade, UF } from './types';

export interface Medico {
  nome: string;
  sexo: string;
  crm: {
    numero: string;
    uf: UF;
  };
  especialidade: Especialidade;
}