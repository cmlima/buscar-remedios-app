export interface Paciente {
  nome: string;
  sexo: string;
  cpf: string;
  rg: {
    numero: string;
    emissor: string;
    uf: string;
  },
  nascimento: string;
}
