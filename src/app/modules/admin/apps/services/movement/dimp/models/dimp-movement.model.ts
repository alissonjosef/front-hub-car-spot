import { IMovement } from '../../models/movement-model';

export enum EDimpType {
    NORMAL = 1,
    NOTIFICATION = 2,
    RETIFICATION = 3,
}

export interface IDimpRequest {
    type: EDimpType;
    states?: string[];
    months?: number[];
}

export interface IDimpMovement extends IMovement {
    periodo: string;
    uf: string;

    dataFechamento: null;
    dataTransmissao: null;

    transmitido: false;
    arquivoDimpId: null;

    pendencia: boolean;

    quantidadeEstabelecimentoTotal: number;
    quantidadeEstabelecimentoElegivel: number;
    quantidadeEstabelecimentoElegivelPendencia: number;
    quantidadeEstabelecimentoNaoElegivel: number;
    quantidadeEstabelecimentoNaoElegivelPendencia: number;
    quantidadeEstabelecimentoNaoEncontrado: number;
    
    somaEstabelecimentoLinhasErro?: number;
    somaEstabelecimentoPendencia?: number;
    
    
    
    quantidadeTransacaoElegivel: number;
    quantidadeTransacaoTotal: number;
    quantidadeTransacaoNaoElegivel: number;
    quantidadeTransacaoElegivelPendencia: number;
    quantidadeTransacaoNaoElegivelPendencia: number;
    quantidadeTransacaoPendencia: number;
    quantidadeTransacaoSemEstabelecimento: number;
    valorTransacaoTotal: number;
    valorTransacaoElegivel: number;
    valorTransacaoElegivelPendencia: number;
    valorTransacaoElegivelSemEstabelecimento: number;
    valorTransacaoNaoElegivel: number;
    valorTransacaoNaoElegivelPendencia: number;
    valorTransacaoSemEstabelecimento: number;
    valorTransacaoPendencia: number;

    somaTransacaoPendencia?: number;
    somaValorTransacaoPendencia?: number;

    quantidadeCancelamentoTotal: number;
    quantidadeCancelamentoElegivel: number;
    quantidadeCancelamentoElegivelPendencia: number;
    quantidadeCancelamentoNaoElegivel: number;
    quantidadeCancelamentoNaoElegivelPendencia: number;
    quantidadeCancelamentoSemEstabelecimento: number;
    quantidadeCancelamentoPendencia: number;
    valorCancelamentoTotal: number;
    valorCancelamentoElegivel: number;
    valorCancelamentoElegivelPendencia: number;
    valorCancelamentoNaoElegivel: number;
    valorCancelamentoNaoElegivelPendencia: number;
    valorCancelamentoSemEstabelecimento: number;
    valorCancelamentoPendencia: number;

    
    sumCancelamentoPendencia?: number;
    sumValorCancelamentoPendencia?: number;

    quantidadeExtemporaneoTotal: number;
    quantidadeExtemporaneoElegivel: number;
    quantidadeExtemporaneoElegivelPendencia: number;
    quantidadeExtemporaneoNaoElegivel: number;
    quantidadeExtemporaneoNaoElegivelPendencia: number;
    quantidadeExtemporaneoSemEstabelecimento: number;
    quantidadeExtemporaneoPendencia: number;
    valorExtemporaneoTotal: number;
    valorExtemporaneoElegivel: number;
    valorExtemporaneoElegivelPendencia: number;
    valorExtemporaneoNaoElegivel: number;
    valorExtemporaneoNaoElegivelPendencia: number;
    valorExtemporaneoSemEstabelecimento: number;
    valorExtemporaneoPendencia: number;

    sumExtemporaneoPendencia?: number;
    sumValorExtemporaneoPendencia?: number;
}

export interface IDimpMovementMonthly {
    movimentoId: 1;
    movimento: IDimpMovement | null;
    dataTransacao: Date;
    pendencia: boolean;
    quantidadeTransacaoTotal: number;
    quantidadeTransacaoElegivel: number;
    quantidadeTransacaoElegivelPendencia: number;
    quantidadeTransacaoNaoElegivel: number;
    quantidadeTransacaoNaoElegivelPendencia: number;
    quantidadeTransacaoSemEstabelecimento: number;
    quantidadeTransacaoPendencia: number;
    quantidadeCancelamentoTotal: number;
    quantidadeCancelamentoElegivel: number;
    quantidadeCancelamentoElegivelPendencia: number;
    quantidadeCancelamentoNaoElegivel: number;
    quantidadeCancelamentoNaoElegivelPendencia: number;
    quantidadeCancelamentoSemEstabelecimento: number;
    quantidadeCancelamentoPendencia: number;
    quantidadeExtemporaneoTotal: number;
    quantidadeExtemporaneoElegivel: number;
    quantidadeExtemporaneoElegivelPendencia: number;
    quantidadeExtemporaneoNaoElegivel: number;
    quantidadeExtemporaneoNaoElegivelPendencia: number;
    quantidadeExtemporaneoSemEstabelecimento: number;
    quantidadeExtemporaneoPendencia: number;
    valorTransacaoTotal: number;
    valorTransacaoElegivel: number;
    valorTransacaoElegivelPendencia: number;
    valorTransacaoNaoElegivel: number;
    valorTransacaoNaoElegivelPendencia: number;
    valorTransacaoSemEstabelecimento: number;
    valorTransacaoPendencia: number;
    valorCancelamentoTotal: number;
    valorCancelamentoElegivel: number;
    valorCancelamentoElegivelPendencia: number;
    valorCancelamentoNaoElegivel: number;
    valorCancelamentoNaoElegivelPendencia: number;
    valorCancelamentoSemEstabelecimento: number;
    valorCancelamentoPendencia: number;
    valorExtemporaneoTotal: number;
    valorExtemporaneoElegivel: number;
    valorExtemporaneoElegivelPendencia: number;
    valorExtemporaneoNaoElegivel: number;
    valorExtemporaneoNaoElegivelPendencia: number;
    valorExtemporaneoSemEstabelecimento: number;
    valorExtemporaneoPendencia: number;
    id: number;
    auditCreatedAt: Date;
    auditUpdatedAt: Date | null;
    auditSystemCreatedBy: any;
    auditSystemUpdatedBy: any;
}
