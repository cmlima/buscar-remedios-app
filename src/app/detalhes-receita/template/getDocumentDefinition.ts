import { Receita } from '../../services/entities';
import { NameCasePipe, SentenceCasePipe } from '../../services/custom-pipes';

const nameCase = (str: string): string => new NameCasePipe().transform(str);
const sentenceCase = (str: string): string => new SentenceCasePipe().transform(str);

export default (receita: Receita, qrcode: string) => {

  const entidade = receita.entidade;
  const medico = receita.medico;
  const paciente = receita.paciente;

  const dateObject = new Date(receita.data.split('/').reverse().join('-') + 'T00:00');
  const data = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }).format(dateObject);

  const prescricao = receita.prescricoes.map(item => {
    const texto = sentenceCase(`${item.medicamento}, ${item.formaFarmaceutica}, ${item.posologia}, por ${item.tempoUso}`) + '.';
    const conteudo = {
      margin: [0, 0, 0, 15],
      lineHeight: 1.2,
      stack: [
        { text: texto, fontSize: 9, bold: false, font: 'RobotoMono' },
      ]
    };
    if (item.observacoes) conteudo.stack.push({ text: `Obs.: ${item.observacoes}`, fontSize: 8, bold: false, font: 'RobotoMono' });
    return conteudo;
  });

  return {
    info: {
      id: receita._id,
      title: 'Receita Médica',
      type: receita.tipo,
      author: medico.nome,
      subject: paciente.nome,
      cpf: paciente.cpf,
      creator: 'Buscar Remédios App',
      producer: 'Buscar Remédios App',
      cancelled: receita.cancelled
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [50, 50, 50, 150],
    watermark: {
      text: receita.cancelled ? 'CANCELADA CANCELADA CANCELADA' : 'CÓPIA CÓPIA CÓPIA NÃO SUBSTITUI O ORIGINAL',
      color: 'gray',
      opacity: 0.3,
      bold: true,
      italics: false,
      angle: -45
    },
    header: {
      margin: 5,
      image: qrcode,
      fit: [70, 70],
      alignment: 'right'
    },
    content: [
      {
        table: {
          widths: [50, '*'],
          body: [
            [
              {
                image: entidade.logo,
                fit: [50, 50],
                border: [false, false, false, true],
                margin: [0, 0, 0, 5]
              },
              {
                stack: [
                  { text: `${entidade.nome}`, bold: true, fontSize: 14, lineHeight: 1.3 },
                  { text: `${entidade.endereco}, ${entidade.cidade}/${entidade.uf} - CEP ${entidade.cep}`, fontSize: 10, lineHeight: 1.1 },
                  { text: `CNPJ nº ${entidade.cnpj}`, fontSize: 10, lineHeight: 1.1 }
                ],
                border: [false, false, false, true],
                margin: [0, 2, 0, 5]
              }
            ]
          ]
        }
      },
      { text: `Receita Médica (${receita.tipo})`, fontSize: 18, bold: true, alignment: 'center', margin: [0, 30] },
      {
        text: [
          { text: 'Paciente:  ', fontSize: 10, bold: true },
          { text: `${nameCase(paciente.nome)}, CPF nº ${paciente.cpf}`, fontSize: 9, bold: false, font: 'RobotoMono' },
        ]
      },
      { text: 'Prescrição:  ', fontSize: 10, bold: true, margin: [0, 20] },
      { ol: prescricao, margin: [5, 0, 0, 0], fontSize: 10, font: 'RobotoMono' },
      { text: 'Observações gerais:  ', fontSize: 10, bold: true, margin: [0, 10, 0, 0] },
      { text: receita.observacoes ? receita.observacoes : 'n/a', fontSize: 9, bold: false, font: 'RobotoMono' },

    ],
    footer: {
      margin: [50, 0],
      alignment: 'center',
      stack: [
        { text: `${entidade.cidade}, ${data}.`, margin: [0, 0, 0, 70] },
        {
          table: {
            widths: [100, '*', 100],
            body: [[{ text: '', border: [0, 0, 0, 0] }, { text: '', border: [0, 1, 0, 0] }, { text: '', border: [0, 0, 0, 0] }]]
          }
        },
        { text: `${medico.sexo === 'M' ? 'Dr. ' : 'Dra. '} ${nameCase(medico.nome)}` },
        { text: nameCase(medico.especialidade) },
        { text: `CRM/${medico.crm.uf} nº ${medico.crm.numero}` },
      ]
    },
    defaultStyle: {
      font: 'Roboto'
    }
  }
}
