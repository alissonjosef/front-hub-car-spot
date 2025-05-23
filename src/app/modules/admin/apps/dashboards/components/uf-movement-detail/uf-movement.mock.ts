export interface IRegulatoryResume {
    movimentoId: number;
    movimento: null;
    dataTransacao: Date;
    pendencia: boolean;

    // Transações
    quantidadeTransacaoTotal: number;
    quantidadeTransacaoElegivel: number;
    quantidadeTransacaoElegivelPendencia: number;
    quantidadeTransacaoNaoElegivel: number;
    quantidadeTransacaoNaoElegivelPendencia: number;
    quantidadeTransacaoSemEstabelecimento: number;
    quantidadeTransacaoPendencia: number;

    // Cancelamentos
    quantidadeCancelamentoTotal: number;
    quantidadeCancelamentoElegivel: number;
    quantidadeCancelamentoElegivelPendencia: number;
    quantidadeCancelamentoNaoElegivel: number;
    quantidadeCancelamentoNaoElegivelPendencia: number;
    quantidadeCancelamentoSemEstabelecimento: number;
    quantidadeCancelamentoPendencia: number;

    // Extemporâneas
    quantidadeExtemporaneoTotal: number;
    quantidadeExtemporaneoElegivel: number;
    quantidadeExtemporaneoElegivelPendencia: number;
    quantidadeExtemporaneoNaoElegivel: number;
    quantidadeExtemporaneoNaoElegivelPendencia: number;
    quantidadeExtemporaneoSemEstabelecimento: number;
    quantidadeExtemporaneoPendencia: number;

    // Marketplace
    quantidadeMarketplaceTotal: number;
    quantidadeMarketplaceElegivel: number;
    quantidadeMarketplaceElegivelPendencia: number;
    quantidadeMarketplaceNaoElegivel: number;
    quantidadeMarketplaceNaoElegivelPendencia: number;
    quantidadeMarketplaceSemEstabelecimento: number;
    quantidadeMarketplacePendencia: number;

    // Conta Conjunta
    quantidadeContaConjuntaTotal: number;
    quantidadeContaConjuntaElegivel: number;
    quantidadeContaConjuntaElegivelPendencia: number;
    quantidadeContaConjuntaNaoElegivel: number;
    quantidadeContaConjuntaNaoElegivelPendencia: number;
    quantidadeContaConjuntaSemEstabelecimento: number;
    quantidadeContaConjuntaPendencia: number;

    // Valores Transações
    valorTransacaoTotal: number;
    valorTransacaoElegivel: number;
    valorTransacaoElegivelPendencia: number;
    valorTransacaoNaoElegivel: number;
    valorTransacaoNaoElegivelPendencia: number;
    valorTransacaoSemEstabelecimento: number;
    valorTransacaoPendencia: number;

    // Valores Cancelamentos
    valorCancelamentoTotal: number;
    valorCancelamentoElegivel: number;
    valorCancelamentoElegivelPendencia: number;
    valorCancelamentoNaoElegivel: number;
    valorCancelamentoNaoElegivelPendencia: number;
    valorCancelamentoSemEstabelecimento: number;
    valorCancelamentoPendencia: number;

    // Valores Extemporâneas
    valorExtemporaneoTotal: number;
    valorExtemporaneoElegivel: number;
    valorExtemporaneoElegivelPendencia: number;
    valorExtemporaneoNaoElegivel: number;
    valorExtemporaneoNaoElegivelPendencia: number;
    valorExtemporaneoSemEstabelecimento: number;
    valorExtemporaneoPendencia: number;

    // Valores Marketplace
    valorMarketplaceTotal: number;
    valorMarketplaceElegivel: number;
    valorMarketplaceElegivelPendencia: number;
    valorMarketplaceNaoElegivel: number;
    valorMarketplaceNaoElegivelPendencia: number;
    valorMarketplaceSemEstabelecimento: number;
    valorMarketplacePendencia: number;

    // Valores Conta Conjunta
    valorContaConjuntaTotal: number;
    valorContaConjuntaElegivel: number;
    valorContaConjuntaElegivelPendencia: number;
    valorContaConjuntaNaoElegivel: number;
    valorContaConjuntaNaoElegivelPendencia: number;
    valorContaConjuntaSemEstabelecimento: number;
    valorContaConjuntaPendencia: number;

    // Auditoria
    id: number;
    auditCreatedAt: Date;
    auditUpdatedAt: Date | null;
    auditSystemCreatedBy: any;
    auditSystemUpdatedBy: any;
}


export interface ITableUfMovementDetail {
    categoria: string;
    estabelecimento: string | number;
    transacoes: string | number;
    cancelamento: string | number;
    contaConjunta: string | number;
    marketplace: string | number;
}

const REGULATORY_RESUME_MOCK: IRegulatoryResume = {
    movimentoId: 1,
    movimento: null,
    dataTransacao: new Date(),
    pendencia: false,

    // Transações
    quantidadeTransacaoTotal: 1200,
    quantidadeTransacaoElegivel: 1000,
    quantidadeTransacaoElegivelPendencia: 20,
    quantidadeTransacaoNaoElegivel: 200,
    quantidadeTransacaoNaoElegivelPendencia: 10,
    quantidadeTransacaoSemEstabelecimento: 8,
    quantidadeTransacaoPendencia: 30,

    // Cancelamentos
    quantidadeCancelamentoTotal: 50,
    quantidadeCancelamentoElegivel: 40,
    quantidadeCancelamentoElegivelPendencia: 5,
    quantidadeCancelamentoNaoElegivel: 5,
    quantidadeCancelamentoNaoElegivelPendencia: 0,
    quantidadeCancelamentoSemEstabelecimento: 2,
    quantidadeCancelamentoPendencia: 5,

    // Extemporâneas
    quantidadeExtemporaneoTotal: 15,
    quantidadeExtemporaneoElegivel: 12,
    quantidadeExtemporaneoElegivelPendencia: 1,
    quantidadeExtemporaneoNaoElegivel: 2,
    quantidadeExtemporaneoNaoElegivelPendencia: 0,
    quantidadeExtemporaneoSemEstabelecimento: 0,
    quantidadeExtemporaneoPendencia: 1,

    // Marketplace
    quantidadeMarketplaceTotal: 300,
    quantidadeMarketplaceElegivel: 250,
    quantidadeMarketplaceElegivelPendencia: 10,
    quantidadeMarketplaceNaoElegivel: 40,
    quantidadeMarketplaceNaoElegivelPendencia: 5,
    quantidadeMarketplaceSemEstabelecimento: 3,
    quantidadeMarketplacePendencia: 15,

    // Conta Conjunta
    quantidadeContaConjuntaTotal: 100,
    quantidadeContaConjuntaElegivel: 80,
    quantidadeContaConjuntaElegivelPendencia: 3,
    quantidadeContaConjuntaNaoElegivel: 15,
    quantidadeContaConjuntaNaoElegivelPendencia: 1,
    quantidadeContaConjuntaSemEstabelecimento: 1,
    quantidadeContaConjuntaPendencia: 4,

    // Valores Transações
    valorTransacaoTotal: 100000,
    valorTransacaoElegivel: 90000,
    valorTransacaoElegivelPendencia: 2000,
    valorTransacaoNaoElegivel: 10000,
    valorTransacaoNaoElegivelPendencia: 500,
    valorTransacaoSemEstabelecimento: 200,
    valorTransacaoPendencia: 2500,

    // Valores Cancelamentos
    valorCancelamentoTotal: 5000,
    valorCancelamentoElegivel: 4500,
    valorCancelamentoElegivelPendencia: 200,
    valorCancelamentoNaoElegivel: 300,
    valorCancelamentoNaoElegivelPendencia: 0,
    valorCancelamentoSemEstabelecimento: 50,
    valorCancelamentoPendencia: 250,

    // Valores Extemporâneas
    valorExtemporaneoTotal: 3000,
    valorExtemporaneoElegivel: 2500,
    valorExtemporaneoElegivelPendencia: 100,
    valorExtemporaneoNaoElegivel: 400,
    valorExtemporaneoNaoElegivelPendencia: 0,
    valorExtemporaneoSemEstabelecimento: 0,
    valorExtemporaneoPendencia: 100,

    // Valores Marketplace
    valorMarketplaceTotal: 40000,
    valorMarketplaceElegivel: 35000,
    valorMarketplaceElegivelPendencia: 800,
    valorMarketplaceNaoElegivel: 4000,
    valorMarketplaceNaoElegivelPendencia: 200,
    valorMarketplaceSemEstabelecimento: 100,
    valorMarketplacePendencia: 1000,

    // Valores Conta Conjunta
    valorContaConjuntaTotal: 20000,
    valorContaConjuntaElegivel: 18000,
    valorContaConjuntaElegivelPendencia: 300,
    valorContaConjuntaNaoElegivel: 1500,
    valorContaConjuntaNaoElegivelPendencia: 100,
    valorContaConjuntaSemEstabelecimento: 50,
    valorContaConjuntaPendencia: 400,

    // Auditoria
    id: 1,
    auditCreatedAt: new Date(),
    auditUpdatedAt: null,
    auditSystemCreatedBy: null,
    auditSystemUpdatedBy: null,
};


export const UF_MOVEMENT_DETAIL = (): ITableUfMovementDetail[] => {
    const d = REGULATORY_RESUME_MOCK;

    return [
        {
            categoria: 'Processados',
            estabelecimento: 10,
            transacoes: d.quantidadeTransacaoTotal,
            cancelamento: d.quantidadeCancelamentoTotal,
            contaConjunta: d.quantidadeContaConjuntaTotal,
            marketplace: d.quantidadeMarketplaceTotal,
        },
        {
            categoria: 'Não Encontrados',
            estabelecimento: '-',
            transacoes: '-',
            cancelamento: '-',
            contaConjunta: '-',
            marketplace: '-',
        },
        {
            categoria: 'Do Período',
            estabelecimento: '-',
            transacoes: '-',
            cancelamento: '-',
            contaConjunta: '-',
            marketplace: '-',
        },
        {
            categoria: 'Extemporâneas',
            estabelecimento: '-',
            transacoes: '-',
            cancelamento: '-',
            contaConjunta: '-',
            marketplace: '-',
        },
        {
            categoria: 'Com erro',
            estabelecimento: '-',
            transacoes: '-',
            cancelamento: '-',
            contaConjunta: '-',
            marketplace: '-',
        },
        {
            categoria: 'Valor Pendências R$',
            estabelecimento: '-',
            transacoes: d.valorTransacaoPendencia,
            cancelamento: d.valorCancelamentoPendencia,
            contaConjunta: d.valorContaConjuntaPendencia,
            marketplace: d.valorMarketplacePendencia,
        },
        {
            categoria: 'Sem Estabelecimento',
            estabelecimento: '-',
            transacoes: d.quantidadeTransacaoSemEstabelecimento,
            cancelamento: d.quantidadeCancelamentoSemEstabelecimento,
            contaConjunta: d.quantidadeContaConjuntaSemEstabelecimento,
            marketplace: d.quantidadeMarketplaceSemEstabelecimento,
        },
        {
            categoria: 'Sem Transação Original',
            estabelecimento: '-',
            transacoes: '-',
            cancelamento: '-',
            contaConjunta: '-',
            marketplace: '-',
        },
    ];
};


