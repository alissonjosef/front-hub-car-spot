import { EStatusMovement } from './movement.enum';

export interface IStatusNavigation {
    id: number;
    auditCreatedAt?: Date;
    auditUpdatedAt?: Date;
    auditSystemCreatedBy?: number;
    auditSystemUpdatedBy?: number;
    nome?: string;
}

export interface IMovement {
    id: number;

    statusId: EStatusMovement;
    statusNavigation?: IStatusNavigationDTO;
    status: EStatusMovement;

    auditCreatedAt: Date;
    auditUpdatedAt: Date;
    auditSystemCreatedBy: number;
    auditSystemUpdatedBy: number;
}

export interface IStatusNavigationDTO {
    label?: string;
    id: EStatusMovement | number;
    actionLabel?: string;
    icon?: string;
    classes?: string;
    buttonLabel: string;
    actions?: number[];
}

export interface IStatusNavigationHistoricItem {
    /* movimentoId: number;
    movimento: T;
    statusNavigation: IStatusNavigation;
    status: number;
    id: number;
    auditCreatedAt: Date;
    auditUpdatedAt: Date;
    auditSystemCreatedBy?: any;
    auditSystemUpdatedBy?: any; */
    statusId: number;
    arquivoDimpId?: null | number;
    dataAlteracao: Date;
    movimentoId: number;
    retificadora: boolean;
    statusDescricao?: null | string;
    usuario: null;
    view?: IStatusNavigationDTO;
}

export const STATUS_NAVIGATION_DTO_OPTIONS: IStatusNavigationDTO[] = [
    {
        id: EStatusMovement.OPENED,
        label: 'Abrir',
        actionLabel: 'Abrir',
        icon: 'hourglass_top',
        classes: 'ring-yellow-600 bg-yellow-500 text-white',
        buttonLabel: 'Aberto',
        actions: [EStatusMovement.CLOSED],
    },
    {
        id: EStatusMovement.CLOSED,
        label: 'Fechar',
        actionLabel: 'Fechar',
        icon: 'lock',
        classes: 'ring-red-600 bg-red-600 text-white',
        buttonLabel: 'Fechado',
        actions: [],
    },
    {
        id: EStatusMovement.GENERATED,
        label: 'Gerar',
        actionLabel: 'Gerar',
        icon: 'auto_awesome',
        classes: 'ring-green-600 bg-green-600 text-white',
        buttonLabel: 'Gerado',
        actions: [EStatusMovement.OPENED],
    },
    {
        id: EStatusMovement.TRANSMITTED,
        label: 'Transmitir',
        actionLabel: 'Transmitir',
        icon: 'wifi_tethering',
        classes: 'ring-blue-600 bg-blue-600 text-white',
        buttonLabel: 'Transmitido',
        actions: [],
    },
];

export const getStatusNavigationDTOById = (id: number) => {
    return STATUS_NAVIGATION_DTO_OPTIONS.find((option) => option.id === id);
};
