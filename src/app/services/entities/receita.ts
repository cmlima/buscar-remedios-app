import type { Entidade } from './entidade';
import type { Medico } from './medico';
import type { Paciente } from './paciente';
import type { Prescricao } from './prescricao';
import type { TipoReceita } from './types';

export interface Receita {
  _id: string;
  tipo: TipoReceita;
  paciente: Paciente;
  medico: Medico;
  entidade: Entidade;
  prescricoes: Prescricao[];
  observacoes: string;
  cancelled: boolean;
}
