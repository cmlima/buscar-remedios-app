import tipos from './tipos.json';
import pacientes from './pacientes.json';
import medicos from './medicos.json';
import entidades from './entidades.json';
import observacoes from './observacoes.json';
import prescricoes from './prescricoes.json';

export const gerarId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 5);
}

export const gerarInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const gerarPrescricoes = (n) => {
  const lista = [];
  for (let i = 0; i < n; i++) {
    let prescricao = gerarInt(0, prescricoes.length - 1);
    while (lista.includes(prescricao)) {
      prescricao = (prescricao + 1) % prescricoes.length;
    }
    lista.push(prescricao);
  }
  return lista.map(index => prescricoes[index]);
}

export const gerarReceita = () => {
  const id = gerarId();
  const tipo = gerarInt(0, tipos.length - 1);
  const paciente = gerarInt(0, pacientes.length - 1);
  const medico = gerarInt(0, medicos.length - 1);
  const entidade = gerarInt(0, entidades.length - 1);
  const observacao = gerarInt(0, observacoes.length - 1);
  return {
    _id: id,
    tipo: tipos[tipo],
    paciente: pacientes[paciente],
    medico: medicos[medico],
    entidade: entidades[entidade],
    prescricoes: gerarPrescricoes(gerarInt(1, Math.min(5, prescricoes.length))),
    observacoes: observacoes[observacao],
    cancelled: Boolean(gerarInt(0, 1))
  }
}

export const gerarReceitas = (n) => {
  const lista = [];
  for (let i = 1; i <= n; i++) {
    lista.push(gerarReceita());
  }
  return lista;
}

