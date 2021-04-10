import { Receita } from '../../services/entities';
import styles from './styles';

export default (receita: Receita, qrcode: string) => {

  const prescricao = receita.prescricoes.map(item => {
    const observacoes = item.observacoes 
      ? `<small class="font-weight-bold">Obs.:</small><small>${item.observacoes}</small>` 
      : '';
    return `
      <li class="pb-2 text-monospace">
        <span class="d-block'>
          ${item.medicamento}, ${item.formaFarmaceutica}, ${item.posologia}, por ${item.tempoUso}
        </span>
      </li>
      ${observacoes}
    `
  });

  const observacoes = receita.observacoes 
    ? `<article><p><span class="d-block font-weight-bold">Observações gerais:</span><span class="d-block text-monospace">${receita.observacoes}</span></p></article>` 
    : '';

  return `
  <!DOCTYPE html>
  <html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${receita._id}</title>
    <style>${styles}</style>
  </head>
  <body class="A3">
    <section class="sheet padding-25mm d-flex flex-column justify-content-between">
      <img class="qrcode" src="${qrcode}" alt="qrcode">
      <article>
        <header class="d-flex flex-row align-items-center justify-content-center mb-3 border-bottom border-secondary">
          <div class="logo my-2">
            <img src="${receita.entidade.logo}" alt="">
          </div>
          <div class="d-flex flex-column align-items-start justify-content-center flex-grow-1 ml-4">
            <h4 class="my-0">${receita.entidade.nome}</h4>
            <p class="my-0">${receita.entidade.endereco}, ${receita.entidade.cidade}/${receita.entidade.uf} - CEP ${receita.entidade.cep}</p>
            <p class="my-0">${receita.entidade.cnpj}</p>
          </div>
          <header class="my-5">
            <h2 class="text-center">Receita Médica (${receita.tipo})</h2>
          </header>
          <article class="mb-4">
            <p class="my-0">
              <span class="font-weight-bold">Paciente:</span>
              <span class="text-monospace">${receita.paciente.nome}, CPF nº ${receita.paciente.cpf}, RG nº ${receita.paciente.rg.numero} ${receita.paciente.rg.emissor}/${receita.paciente.rg.uf}, nascimento: ${receita.paciente.nascimento}</span>
            </p>
            <p class="my-0">
              <span class="font-weight-bold">Prescrição:</span>
              <ol>
                ${prescricao}
              </ol>
            </p>
          </article>
          ${observacoes}
        </header>
      </article>
      <article>
        <article class="mb-5 text-center">
          <p>${receita.entidade.cidade}, ${receita.data}</p>
        </article>
        <article class="pt-5">
          <p class="mx-auto my-auto mb-1 w-75 border-bottom border-secondary">&nbsp;</p>
          <p class="mx-auto my-auto pt-2 w-75 text-center">
            <span>${receita.medico.sexo === 'M' ? 'Dr. ' : 'Dra. '}</span>
            <span class="font-weight-bold">${receita.medico.nome.toUpperCase()}</span>
          </p>
          <p class="mx-auto my-auto mt-0 w-75 text-center">
            ${receita.medico.especialidade.substr(0,1).toUpperCase()}${receita.medico.especialidade.substr(1).toLowerCase()}
          </p>
          <p class="mx-auto my-auto mt-0 w-75 text-center">
            CRM nº ${receita.medico.crm.numero}/${receita.medico.crm.uf}
          </p>
        </article>
      </article>
    </section>
  </body>
  </html>
  `;
}
