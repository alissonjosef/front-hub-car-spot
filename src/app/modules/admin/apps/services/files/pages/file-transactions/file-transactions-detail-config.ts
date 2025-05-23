import { CardDetailConfig } from '@shared/components/card-detail/card-detail.component';

export const fileTransactionDayDetailConfig: CardDetailConfig[] = [
    {
        header: 'Transações na base com alteração',
        icon: 'mat_outline:edit',
        bgClass: 'bg-secondary-100',
        groups: [
            {
                subtitle: '',
                items: [
                    { key: 'quantidadeTransacaoAlterada', label: 'Qtd.:', applyColor: true },
                    { key: 'valorTransacaoAlterada', label: 'Valor:', pipe: 'currency', applyColor: true },
                ],
            },
        ],
    },
    /* {
        header: 'Com erro',
        icon: 'mat_outline:error',
        bgClass: 'bg-secondary-100',
        groups: [
            {
                subtitle: '',
                items: [
                    { key: 'quantidadeTransacaoErro', label: 'Qtd.:', applyColor: true },
                    { key: 'valorTransacaoErro', label: 'Valor:', pipe: 'currency', applyColor: true },
                ],
            },
        ],
    }, */
    {
        header: 'Transações duplicadas não inseridas na base',
        icon: 'mat_outline:check_circle',
        bgClass: 'bg-secondary-100',
        groups: [
            {
                subtitle: '',
                items: [
                    { key: 'quantidadeTransacaoExistente', label: 'Qtd.:', applyColor: true },
                    { key: 'valorTransacaoExistente', label: 'Valor:', pipe: 'currency', applyColor: true },
                ],
            },
        ],
    },
    {
        header: 'Transações enviadas e carregadas na base',
        icon: 'mat_outline:add_circle',
        bgClass: 'bg-secondary-100',
        groups: [
            {
                subtitle: '',
                items: [
                    { key: 'quantidadeTransacaoInserida', label: 'Qtd.:', applyColor: true },
                    { key: 'valorTransacaoInserida', label: 'Valor:', pipe: 'currency', applyColor: true },
                ],
            },
        ],
    },
    /* {
        id: 'totals',
        header: 'Totais',
        icon: 'mat_outline:assessment',
        bgClass: 'bg-light-200',
        groups: [
            {
                subtitle: '',
                items: [
                    { key: 'quantidadeTransacaoTotal', label: 'Qtd.:', applyColor: true },
                    { key: 'valorTransacaoTotal', label: 'Valor:', pipe: 'currency', applyColor: true },
                ],
            },
        ],
    }, */
    /* {
        id: 'movement',
        header: 'Movimento',
        icon: 'mat_outline:auto_awesome_motion',
        bgClass: 'bg-light-300',
        routerLink: '/apps/services/movement/dimp/details/{MOVIMENTO_ID}',
        routerVar: [
            {
                key: 'movimento.id',
                replace: '{MOVIMENTO_ID}',
            },
        ],
        groups: [
            {
                subtitle: '',
                items: [
                    { key: 'movimento.id', label: 'ID:', applyColor: true },
                    { key: 'movimento.statusView.buttonLabel', label: 'Status:' },
                ],
            },
        ],
    }, */
];
