import { CardDetailConfig } from '../../../../../../../shared/components/card-detail/card-detail.component';

export const dimpMovementMonthlyConfig: CardDetailConfig[] = [
    {
        header: 'Transações',
        icon: 'mat_outline:receipt_long',
        bgClass: 'bg-secondary-100',
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
            {
                subtitle: 'Pendência',
                items: [
                    { key: 'quantidadeTransacaoPendencia', label: 'Quantidade', applyColor: true },
                    { key: 'valorTransacaoPendencia', label: 'Valor', pipe: 'currency', applyColor: true },
                ],
            },
            {
                subtitle: 'Sem Estabelecimento',
                items: [
                    { key: 'quantidadeTransacaoSemEstabelecimento', label: 'Quantidade', applyColor: true },
                    { key: 'valorTransacaoSemEstabelecimento', label: 'Valor', pipe: 'currency', applyColor: true },
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
        bgClass: 'bg-secondary-100',
        groups: [
            {
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
            },
            {
                subtitle: 'Pendência',
                items: [
                    { key: 'quantidadeCancelamentoPendencia', label: 'Quantidade', applyColor: true },
                    { key: 'valorCancelamentoPendencia', label: 'Valor', pipe: 'currency', applyColor: true },
                ],
            },
            {
                subtitle: 'Sem Estabelecimento',
                items: [
                    { key: 'quantidadeCancelamentoSemEstabelecimento', label: 'Quantidade', applyColor: true },
                    { key: 'valorCancelamentoSemEstabelecimento', label: 'Valor', pipe: 'currency', applyColor: true },
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
        bgClass: 'bg-secondary-100',
        groups: [
            {
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
            },
            {
                subtitle: 'Pendência',
                items: [
                    { key: 'quantidadeExtemporaneoPendencia', label: 'Quantidade', applyColor: true },
                    { key: 'valorExtemporaneoPendencia', label: 'Valor', pipe: 'currency', applyColor: true },
                ],
            },
            {
                subtitle: 'Sem Estabelecimento',
                items: [
                    { key: 'quantidadeExtemporaneoSemEstabelecimento', label: 'Quantidade', applyColor: true },
                    { key: 'valorExtemporaneoSemEstabelecimento', label: 'Valor', pipe: 'currency', applyColor: true },
                ],
            },
        ],
        totals: [
            { key: 'quantidadeExtemporaneoTotal', label: 'Qtd. Total', classes: ['font-bold'] },
            { key: 'valorExtemporaneoTotal', label: 'Valor Total', pipe: 'currency', applyColor: true, classes: ['font-bold'] },
        ],
    },
];
