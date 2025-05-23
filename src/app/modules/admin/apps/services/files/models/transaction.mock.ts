import moment from 'moment';
import { IFileTransactionDay } from './file.model';

let idCounter = 1;

const ufs = ['SP', 'RJ', 'MG', 'ES', 'PR', 'SC', 'RS', 'PE', 'AL', 'SE', 'BA'];
const transactionMonths = 12; // Número de meses retroativos

const transactionsMock: IFileTransactionDay[] = [];

// Criando transações mock
ufs.forEach((uf) => {
    for (let i = 0; i < transactionMonths; i++) {
        const transactionDate = moment().subtract(i, 'months').endOf('month').toDate(); // Último dia do mês
        const period = moment(transactionDate).startOf('month').toDate(); // Primeiro dia do mês

        /* transactionsMock.push({
            id: idCounter++,
            fileId: Math.floor(Math.random() * 100) + 1,
            period,
            uf,
            transactionDate,
            establishmentNotFound: Math.floor(Math.random() * 50),
            transactionTotal: Math.floor(Math.random() * 5000),
            transactionPending: Math.floor(Math.random() * 200),
            transactionWithoutEstablishment: Math.floor(Math.random() * 150),
            transactionValueTotal: parseFloat((Math.random() * 100000).toFixed(2)),
            transactionValuePending: parseFloat((Math.random() * 5000).toFixed(2)),
            transactionValueWithoutEstablishment: parseFloat((Math.random() * 3000).toFixed(2)),
        }); */
    }
});

export const MOCK_DPS_TRANSACTIONS_DAYS = () => ({
    /**
     * Retorna todas as UFs disponíveis.
     */
    allUfs: ufs,

    /**
     * Retorna todas as datas disponíveis ou apenas as relacionadas às UFs informadas.
     * @param ufs Lista de UFs (opcional).
     * @returns Lista de datas (formato Date).
     */
    datesByUfs: (ufsFilter?: string[]): Date[] => {
        const filteredTransactions = transactionsMock.filter(
            (t) => !ufsFilter || ufsFilter.length === 0 || ufsFilter.includes(t.movimento.uf)
        );
    
        const uniqueDates = Array.from(
            new Set(filteredTransactions.map((t) => moment(t.dataReferencia).format('YYYY-MM-DD')))
        ).map((dateString) => moment(dateString, 'YYYY-MM-DD').toDate()); // Convertendo string de volta para Date
    
        return uniqueDates.sort((a, b) => b.getTime() - a.getTime());
    },

    /**
     * Retorna todas as transações ou apenas as filtradas por UF e/ou data.
     * @param ufs Lista de UFs (opcional).
     * @param dates Lista de datas (formato Date) (opcional).
     * @returns Lista de transações filtradas.
     */
    transactions: (ufsFilter?: string[], datesFilter?: Date[]): IFileTransactionDay[] => {
        return transactionsMock.filter(
            (t) =>
                (!ufsFilter || ufsFilter.length === 0 || ufsFilter.includes(t.movimento.uf)) &&
                (!datesFilter || datesFilter.length === 0 || datesFilter.some((d) => moment(d).isSame(t.dataReferencia, 'day')))
        );
    },
});
