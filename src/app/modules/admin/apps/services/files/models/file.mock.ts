import { EDPSFileStatus, EFileTypeDPS, IFile } from './file.model';

let idCounter = 1;

const fileTypes: EFileTypeDPS[] = [
    EFileTypeDPS.CLIENT,
    EFileTypeDPS.TRANSACTION,
    EFileTypeDPS.CANCEL,
    EFileTypeDPS.JOINT_ACOCUNT,
    EFileTypeDPS.MARKETPLACE,
];

const statuses: EDPSFileStatus[] = [EDPSFileStatus.PENDING, EDPSFileStatus.PROCESSING, EDPSFileStatus.PROCESSED, EDPSFileStatus.ERROR];

const fileTypeLabels: { [key in EFileTypeDPS]: string } = {
    [EFileTypeDPS.CLIENT]: 'Cliente',
    [EFileTypeDPS.TRANSACTION]: 'Transação',
    [EFileTypeDPS.CANCEL]: 'Cancelamento',
    [EFileTypeDPS.JOINT_ACOCUNT]: 'Conta Conjunta',
    [EFileTypeDPS.MARKETPLACE]: 'Marketplace',
};

const statusLabels: { [key in EDPSFileStatus]: string } = {
    [EDPSFileStatus.PENDING]: 'Pendente',
    [EDPSFileStatus.PROCESSING]: 'Em Processamento',
    [EDPSFileStatus.PROCESSED]: 'Processado',
    [EDPSFileStatus.ERROR]: 'Erro',
};

export const MOCK_DPS_FILES = (): IFile[] => {
    const mock = [];
    fileTypes.forEach((fileType) => {
        statuses.forEach((status) => {
            mock.push({
                id: idCounter++,
                type: fileType,
                name: `${fileTypeLabels[fileType]} - ${statusLabels[status]}`,
                size: 1024 * fileType, // valor arbitrário baseado no tipo
                processingDate: new Date(),
                totalLines: 100 * fileType,
                totalProcessedLines: status === EDPSFileStatus.ERROR ? 100 * fileType - 5 : 100 * fileType,
                status: status,
            });
        });
    });

    return mock;
};
