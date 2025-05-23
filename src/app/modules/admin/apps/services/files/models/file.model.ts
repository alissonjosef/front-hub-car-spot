import { Moment } from 'moment';
import { IDimpMovement } from '../../movement/dimp/models/dimp-movement.model';
import { ERegulatory, getRegulatoryType, Regulatory } from './regulatory.model';

export enum EFileTypeDPS {
    CLIENT = 1,
    TRANSACTION = 2,
    CANCEL = 3,
    JOINT_ACOCUNT = 4,
    MARKETPLACE = 5,
}

export enum EDPSFileStatus {
    PENDING = 1,
    PROCESSING = 2,
    PROCESSED = 3,
    ERROR = 4,
}

export interface DPSFilter {
    regulatory: string;
    paymentInstitutionId: number;
    fileTypes: EFileTypeDPS[];
    filename?: string;
    status: EDPSFileStatus;
    period: Moment;
}

export interface FileTypeDPS {
    type: EFileTypeDPS;
    typeLabel: string;
    selected?: boolean;
}

export interface DPSRegulatory {
    regulatory: Regulatory;
    fileTypes: any[];
}

export const REGULATORIES_DPS = () => {
    const commonTypes = [
        {
            type: EFileTypeDPS.TRANSACTION,
            typeLabel: 'Transações',
            selected: true,
        },
        {
            type: EFileTypeDPS.CLIENT,
            typeLabel: 'Estabelecimentos',
            selected: true,
        },
    ];

    const decredTypes = [];

    const dimpTypes = [
        {
            type: EFileTypeDPS.JOINT_ACOCUNT,
            typeLabel: 'Conta conjunta',
            selected: true,
        },
        {
            type: EFileTypeDPS.CANCEL,
            typeLabel: 'Transações cancelamento',
            selected: true,
        },
        {
            type: EFileTypeDPS.MARKETPLACE,
            typeLabel: 'Transações marketplace',
            selected: true,
        },
    ];

    return {
        [ERegulatory.DIMP]: [...commonTypes, ...dimpTypes],
    };
};

export interface IFile {
    id: number;
    tipo: EFileTypeDPS;
    tipoId: EFileTypeDPS;
    nome: string;
    tamanhoBytes: number;
    dataFim: Date;
    dataInicio: Date;
    erro: any;
    execucao: any;
    execucaoId: number;
    md5Hash: string;
    statusNavigation?: any;
    tipoNavigation?: any;
    totalLinhas: number;
    totalLinhasDivergencia: number;
    totalLinhasProcessadas: number;
    status: number;
    statusId: number;
    auditCreatedAt?: Date;
    auditUpdatedAt?: Date;
    auditSystemCreatedBy?: any;
    auditSystemUpdatedBy?: any;
}

export interface IFileTransaction {
    id: number;
    fileId: number;
    establishmentTotal: number;
    establishmentsPending: number;
    establishmentNotFound: number;
    transactionTotal: number;
    transactionPending: number;
    transactionWithoutEstablishment: number;
    transactionValueTotal: number;
    transactionValuePending: number;
    transactionValueWithoutEstablishment: number;
}

export interface IFileTransactionDay {
    id: number;

    arquivo: IFile;
    arquivoId: number;

    auditCreatedAt: Date;
    auditUpdatedAt: Date;
    auditSystemCreatedBy?: any;
    auditSystemUpdatedBy?: any;

    dataReferencia: Date;
    movimento: IDimpMovement;
    movimentoId: number;

    quantidadeTransacaoAlterada: number;
    quantidadeTransacaoErro: number;
    quantidadeTransacaoExistente: number;
    quantidadeTransacaoInserida: number;
    quantidadeTransacaoMovimentoFechado: number;
    quantidadeTransacaoSemEstabelecimento: number;
    quantidadeTransacaoTotal: number;

    valorTransacaoAlterada: number;
    valorTransacaoErro: number;
    valorTransacaoExistente: number;
    valorTransacaoInserida: number;
    valorTransacaoMovimentoFechado: number;
    valorTransacaoSemEstabelecimento: number;
    valorTransacaoTotal: number;
}

export interface DPSFilterPeriod {
    label: string;
    type: '24HS' | '7D' | '15D' | '30D';
}

export interface DPSFilterStatus {
    label: string;
    status?: EDPSFileStatus;
    classes?: string;
}

/* 
  - Tela principal:
    > data fim processamento
  
  - Detalhes:
    > DIMP por UF e Data (contabilidade por data)
    > um arquivo pode ter mais de uma UF

  > Tela de Transações do arquivo.
   - Filtragem lateral por data
   - Filtragem geral por UF

*/

export interface RegFileInfoType {
    regulatoryType: ERegulatory;
    availableRegTypes: Regulatory[];
    fileType: FileTypeDPS;
}

export const filterRegulatoryDPS = (fileType: EFileTypeDPS | FileTypeDPS, regulatoryId?: ERegulatory | string): DPSRegulatory[] => {
    // Extrai o valor numérico do fileType (caso seja um número ou esteja dentro do objeto FileTypeDPS)
    const fileTypeValue: number = typeof fileType === 'number' ? fileType : fileType.type;

    // Obtém o objeto com os regulatórios
    const regulatoryDPS = REGULATORIES_DPS();

    // Se regulatoryId for fornecido, converte para número para comparação
    const regIdValue: number | null = regulatoryId != null ? Number(regulatoryId) : null;

    const result: DPSRegulatory[] = [];

    // Itera sobre os regulatórios disponíveis
    Object.entries(regulatoryDPS).forEach(([key, fileTypes]) => {
        // Se um regulatoryId for informado, verifica se o regulatório atual corresponde
        if (regIdValue !== null && Number(key) !== regIdValue) {
            return;
        }

        // Filtra os fileTypes pelo tipo fornecido (comparação numérica)
        const filteredFileTypes = fileTypes.filter((file: FileTypeDPS) => file.type === fileTypeValue);

        if (filteredFileTypes.length > 0) {
            result.push({
                regulatory: {
                    type: Number(key) as ERegulatory,
                    name: Object.values(ERegulatory)[Number(key)] as string,
                },
                fileTypes: filteredFileTypes,
            });
        }
    });

    return result;
};

export const getRegulatoryTypeByFilename = (filename: string): RegFileInfoType | null => {
    if (!filename) return null;

    // Converte o nome do arquivo para minúsculas para facilitar a comparação
    const normalizedFilename = filename.toLowerCase();

    // Mapeamento de padrões de nome para os novos tipos numéricos
    const fileTypeMap: { [key in EFileTypeDPS]?: RegExp } = {
        [EFileTypeDPS.MARKETPLACE]: /^marketplace_|^transacoes_marketplace_/i,
        [EFileTypeDPS.CANCEL]: /^cancelamento_|^transacoes_cancelamento_/i,
        [EFileTypeDPS.TRANSACTION]: /^transaction_|^transacoes_/i,
        [EFileTypeDPS.JOINT_ACOCUNT]: /^jointaccount_|^conta_conjunta_/i,
        [EFileTypeDPS.CLIENT]: /^client_|^cliente_/i,
    };

    // Mapeamento de labels para cada tipo
    const fileTypeLabels: { [key in EFileTypeDPS]: string } = {
        [EFileTypeDPS.CLIENT]: 'Cliente',
        [EFileTypeDPS.TRANSACTION]: 'Transação',
        [EFileTypeDPS.CANCEL]: 'Cancelamento',
        [EFileTypeDPS.JOINT_ACOCUNT]: 'Conta Conjunta',
        [EFileTypeDPS.MARKETPLACE]: 'Marketplace',
    };

    let fileType: FileTypeDPS | null = null;

    // Itera sobre os padrões definidos e identifica o tipo com base no nome do arquivo
    for (const [key, regex] of Object.entries(fileTypeMap)) {
        const typeKey = Number(key) as EFileTypeDPS;
        if (regex && regex.test(normalizedFilename)) {
            fileType = {
                type: typeKey,
                typeLabel: fileTypeLabels[typeKey] || 'Desconhecido',
            };
            break;
        }
    }

    if (!fileType) return null; // Se nenhum padrão bater, retorna null

    // Obtém os regulatórios (supondo que REGULATORIES_DPS esteja atualizado para os novos tipos)
    const regulatoryDPS = REGULATORIES_DPS();
    const availableRegTypes: ERegulatory[] = [];

    // Itera pelos regulatórios e verifica quais contêm o fileType identificado
    Object.entries(regulatoryDPS).forEach(([regulatoryKey, fileTypes]) => {
        if (fileTypes.some((ft: FileTypeDPS) => ft.type === fileType!.type)) {
            availableRegTypes.push(Number(regulatoryKey) as ERegulatory);
        }
    });

    if (availableRegTypes.length === 0) return null;

    return {
        regulatoryType: availableRegTypes[0],
        availableRegTypes: availableRegTypes.map((el) => getRegulatoryType(el)),
        fileType,
    };
};
