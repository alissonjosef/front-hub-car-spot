import { CardDetailConfig } from '../../../../../../../shared/components/card-detail/card-detail.component';

export const CURRENT_MOVEMENT: CardDetailConfig[] = [
    {
        header: 'Estabelecimentos',
        icon: 'mat_outline:storefront',
        groups: [
            {
                subtitle: 'Pendências',
                items: [
                    { key: 'somaEstabelecimentoLinhasErro', label: 'Linhas com erro:', applyColor: true, applyColorInverted: true },
                    {
                        key: 'quantidadeEstabelecimentoNaoEncontrado',
                        label: "EC's. não encontrados:",
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
                totals: [
                    {
                        key: 'somaEstabelecimentoPendencia',
                        label: 'Total de pendências:',
                        classes: ['font-bold'],
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
            },
        ],
        totals: [{ key: 'quantidadeEstabelecimentoTotal', label: 'Total de estabelecimentos', classes: ['font-bold'] }],
    },
    {
        header: 'Transações',
        icon: 'mat_outline:receipt_long',
        groups: [
            /* {
                subtitle: 'Elegíveis',
                items: [
                    { key: 'quantidadeTransacaoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorTransacaoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    {
                        key: 'valorTransacaoElegivelSemEstabelecimento',
                        label: 'Valor sem estabelecimento',
                        pipe: 'currency',
                        applyColor: true,
                    },
                    { key: 'quantidadeTransacaoElegivel', label: 'Qtd. elegível', applyColor: true },
                    { key: 'valorTransacaoElegivel', label: 'Valor elegível', pipe: 'currency', applyColor: true },
                ],
            },
            {
                subtitle: 'Não Elegíveis',
                items: [
                    { key: 'quantidadeTransacaoNaoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorTransacaoNaoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    { key: 'quantidadeTransacaoNaoElegivel', label: 'Qtd. não elegível', applyColor: true },
                    { key: 'valorTransacaoNaoElegivel', label: 'Valor não elegível', pipe: 'currency', applyColor: true },
                ],
            }, */
            {
                subtitle: 'Pendência',
                items: [
                    { key: 'quantidadeTransacaoPendencia', label: 'Linhas com erro:', applyColor: true, applyColorInverted: true },
                    {
                        key: 'valorTransacaoPendencia',
                        label: 'Valor com erro:',
                        pipe: 'currency',
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    { key: 'quantidadeTransacaoSemEstabelecimento', label: "Qtde. sem EC's:", applyColor: true, applyColorInverted: true },
                    {
                        key: 'valorTransacaoSemEstabelecimento',
                        label: "Valor sem EC's:",
                        pipe: 'currency',
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
                totals: [
                    {
                        key: 'somaTransacaoPendencia',
                        label: 'Qtde. pendências:',
                        classes: ['font-bold'],
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    {
                        key: 'somaValorTransacaoPendencia',
                        label: 'Valor pendências:',
                        pipe: 'currency',
                        classes: ['font-bold'],
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
            },
        ],
        totals: [
            { key: 'quantidadeTransacaoTotal', label: 'Qtd. Total', classes: ['font-bold'] },
            { key: 'valorTransacaoTotal', label: 'Valor Total', pipe: 'currency', applyColor: true, classes: ['font-bold'] },
        ],
    },
    {
        header: 'Cancelamentos',
        icon: 'mat_outline:cancel',
        groups: [
            /*  {
                subtitle: 'Elegíveis',
                items: [
                    { key: 'quantidadeCancelamentoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorCancelamentoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    { key: 'quantidadeCancelamentoElegivel', label: 'Qtd. elegível', applyColor: true },
                    { key: 'valorCancelamentoElegivel', label: 'Valor elegível', pipe: 'currency', applyColor: true },
                ],
            },
            {
                subtitle: 'Não Elegíveis',
                items: [
                    { key: 'quantidadeCancelamentoNaoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorCancelamentoNaoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    { key: 'valorCancelamentoNaoElegivel', label: 'Valor não elegível', pipe: 'currency', applyColor: true },
                    { key: 'quantidadeCancelamentoNaoElegivel', label: 'Qtd. não elegível', applyColor: true },
                ],
            }, */
            {
                subtitle: 'Pendência',
                items: [
                    { key: 'quantidadeCancelamentoPendencia', label: 'Linhas com erro:', applyColor: true, applyColorInverted: true },
                    {
                        key: 'valorCancelamentoPendencia',
                        label: 'Valor com erro:',
                        pipe: 'currency',
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    {
                        key: 'quantidadeCancelamentoSemEstabelecimento',
                        label: "Qtde. sem EC's:",
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    {
                        key: 'valorCancelamentoSemEstabelecimento',
                        label: "Valor sem EC's:",
                        pipe: 'currency',
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
                totals: [
                    {
                        key: 'sumCancelamentoPendencia',
                        label: 'Qtde. pendências:',
                        classes: ['font-bold'],
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    {
                        key: 'sumValorCancelamentoPendencia',
                        label: 'Valor pendências:',
                        pipe: 'currency',
                        classes: ['font-bold'],
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
            },
        ],
        totals: [
            { key: 'quantidadeCancelamentoTotal', label: 'Qtd. Total', classes: ['font-bold'] },
            { key: 'valorCancelamentoTotal', label: 'Valor Total', pipe: 'currency', applyColor: true, classes: ['font-bold'] },
        ],
    },
    {
        header: 'Tansações extemporâneas',
        icon: 'mat_outline:access_time',
        groups: [
            /* {
                subtitle: 'Elegíveis',
                items: [
                    { key: 'quantidadeExtemporaneoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorExtemporaneoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    { key: 'quantidadeExtemporaneoElegivel', label: 'Qtd. elegível', applyColor: true },
                    { key: 'valorExtemporaneoElegivel', label: 'Valor elegível', pipe: 'currency', applyColor: true },
                ],
            },
            {
                subtitle: 'Não Elegíveis',
                items: [
                    { key: 'quantidadeExtemporaneoNaoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorExtemporaneoNaoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    { key: 'quantidadeExtemporaneoNaoElegivel', label: 'Qtd. não elegível', applyColor: true },
                    { key: 'valorExtemporaneoNaoElegivel', label: 'Valor não elegível', pipe: 'currency', applyColor: true },
                ],
            }, */
            {
                subtitle: 'Pendência',
                items: [
                    { key: 'quantidadeExtemporaneoPendencia', label: 'Linhas com erro:', applyColor: true, applyColorInverted: true },
                    {
                        key: 'valorExtemporaneoPendencia',
                        label: 'Valor com erro:',
                        pipe: 'currency',
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    {
                        key: 'quantidadeExtemporaneoSemEstabelecimento',
                        label: "Qtde. sem EC's:",
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    {
                        key: 'valorExtemporaneoSemEstabelecimento',
                        label: "Valor sem EC's:",
                        pipe: 'currency',
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
                totals: [
                    {
                        key: 'sumExtemporaneoPendencia',
                        label: 'Qtde. pendências:',
                        classes: ['font-bold'],
                        applyColor: true,
                        applyColorInverted: true,
                    },
                    {
                        key: 'sumValorExtemporaneoPendencia',
                        label: 'Valor pendências:',
                        pipe: 'currency',
                        classes: ['font-bold'],
                        applyColor: true,
                        applyColorInverted: true,
                    },
                ],
            },
        ],
        totals: [
            { key: 'quantidadeExtemporaneoTotal', label: 'Qtd. Total', classes: ['font-bold'] },
            { key: 'valorExtemporaneoTotal', label: 'Valor Total', pipe: 'currency', applyColor: true, classes: ['font-bold'] },
        ],
    },
];

export const HISTORY_MOVEMENT: CardDetailConfig[] = [
    {
        header: 'Transações',
        icon: 'mat_outline:receipt_long',
        groups: [
            {
                subtitle: 'Elegíveis',
                items: [
                    { key: 'quantidadeTransacaoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorTransacaoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    {
                        key: 'valorTransacaoElegivelSemEstabelecimento',
                        label: 'Valor sem estabelecimento',
                        pipe: 'currency',
                        applyColor: true,
                    },
                    { key: 'quantidadeTransacaoElegivel', label: 'Qtd. elegível', applyColor: true },
                    { key: 'valorTransacaoElegivel', label: 'Valor elegível', pipe: 'currency', applyColor: true },
                ],
            },
            {
                subtitle: 'Não Elegíveis',
                items: [
                    { key: 'quantidadeTransacaoNaoElegivelPendencia', label: 'Qtd. pendência', applyColor: true },
                    { key: 'valorTransacaoNaoElegivelPendencia', label: 'Valor pendência', pipe: 'currency', applyColor: true },
                    { key: 'quantidadeTransacaoNaoElegivel', label: 'Qtd. não elegível', applyColor: true },
                    { key: 'valorTransacaoNaoElegivel', label: 'Valor não elegível', pipe: 'currency', applyColor: true },
                ],
            },
        ],
        totals: [
            { key: 'quantidadeTransacaoTotal', label: 'Qtd. Total', classes: ['font-bold'] },
            { key: 'valorTransacaoTotal', label: 'Valor Total', pipe: 'currency', applyColor: true, classes: ['font-bold'] },
        ],
    },
];

export const tabs = [
    {
        id: 'current',
        title: 'Movimento',
        cards: CURRENT_MOVEMENT,
    },
    /* {
        id: 'history',
        title: 'Histórico de geração',
        cards: HISTORY_MOVEMENT,
    }, */
];
