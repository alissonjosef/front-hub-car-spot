import moment from 'moment';
import { EStatusMovement, ITransactionMovement } from './models/movement.model';

let idCounter = 1;

const ufs = ['SP', 'RJ', 'MG', 'ES', 'PR', 'SC', 'RS', 'PE', 'AL', 'SE', 'BA', 'DF', 'GO', 'MT', 'MS', 'TO', 'AM', 'AC', 'AP', 'PA', 'RO', 'RR', 'MA', 'PI', 'CE', 'RN', 'PB'];

const transactionsMock: ITransactionMovement[] = [];

ufs.forEach((uf) => {
    const auditCreatedAt = moment().subtract(Math.floor(Math.random() * 12), 'months').toDate();
    const auditUpdatedAt = moment(auditCreatedAt).add(5, 'days').toDate();

    transactionsMock.push({
        id: idCounter++,
        auditCreatedAt,
        auditUpdatedAt,
        auditSystemCreatedBy: Math.floor(Math.random() * 10) + 1,
        auditSystemUpdatedBy: Math.floor(Math.random() * 10) + 1,
        periodo: moment(auditCreatedAt).format('YYYY-MM'),
        uf,
        statusId: Math.floor(Math.random() * 4) + 1,
        statusNavigation: {
            id: Math.floor(Math.random() * 4) + 1,
            auditCreatedAt,
            auditUpdatedAt,
            auditSystemCreatedBy: Math.floor(Math.random() * 10) + 1,
            auditSystemUpdatedBy: Math.floor(Math.random() * 10) + 1,
            nome: Object.keys(EStatusMovement)[Math.floor(Math.random() * 4)]
        },
        status: Math.floor(Math.random() * 4) + 1,
        transmitido: true,
        quantidadeEstabelecimentoTotal: Math.floor(Math.random() * 1000),
        quantidadeEstabelecimentoElegivel: Math.floor(Math.random() * 800),
        quantidadeEstabelecimentoElegivelPendencia: Math.floor(Math.random() * 100),
        quantidadeEstabelecimentoElegivelNaoEncontrado: Math.floor(Math.random() * 50),
        quantidadeEstabelecimentoNaoElegivel: Math.floor(Math.random() * 200),
        quantidadeEstabelecimentoNaoElegivelPendencia: Math.floor(Math.random() * 50),
        quantidadeEstabelecimentoNaoEncontrado: Math.floor(Math.random() * 30),
        quantidadeTransacaoTotal: Math.floor(Math.random() * 10000),
        quantidadeTransacaoElegivel: Math.floor(Math.random() * 8000),
        quantidadeTransacaoElegivelPendenciaEstabelecimento: Math.floor(Math.random() * 200),
        quantidadeTransacaoElegivelPendenciaTransacao: Math.floor(Math.random() * 150),
        quantidadeTransacaoElegivelSemEstabelecimento: Math.floor(Math.random() * 120),
        quantidadeTransacaoNaoElegivel: Math.floor(Math.random() * 500),
        quantidadeTransacaoNaoElegivelPendenciaEstabelecimento: Math.floor(Math.random() * 100),
        quantidadeTransacaoNaoElegivelPendenciaTransacao: Math.floor(Math.random() * 80),
        quantidadeTransacaoSemEstabelecimento: Math.floor(Math.random() * 70),
        quantidadeTransacaoPendenciaTransacao: Math.floor(Math.random() * 90),
        valorTransacaoTotal: parseFloat((Math.random() * 1000000).toFixed(2)),
        valorTransacaoElegivel: parseFloat((Math.random() * 800000).toFixed(2)),
        valorTransacaoElegivelPendenciaEstabelecimento: parseFloat((Math.random() * 5000).toFixed(2)),
        valorTransacaoElegivelPendenciaTransacao: parseFloat((Math.random() * 3000).toFixed(2)),
        valorTransacaoElegivelSemEstabelecimento: parseFloat((Math.random() * 2500).toFixed(2)),
        valorTransacaoNaoElegivel: parseFloat((Math.random() * 10000).toFixed(2)),
        valorTransacaoNaoElegivelPendenciaEstabelecimento: parseFloat((Math.random() * 4000).toFixed(2)),
        valorTransacaoNaoElegivelPendenciaTransacao: parseFloat((Math.random() * 3500).toFixed(2)),
        valorTransacaoSemEstabelecimento: parseFloat((Math.random() * 3000).toFixed(2)),
        valorTransacaoPendenciaTransacao: parseFloat((Math.random() * 2000).toFixed(2)),
    });
});

export const MOCK_TRANSACTION_MOVEMENTS = () => ({
    allTransactions: transactionsMock,

    getTransactions: (ufsFilter?: string[], periodoFilter?: string[]): ITransactionMovement[] => {
        return transactionsMock.filter(
            (t) =>
                (!ufsFilter || ufsFilter.includes(t.uf)) &&
                (!periodoFilter || periodoFilter.includes(t.periodo))
        );
    },
});
