import * as FileSaver from 'file-saver';

export const normalizeRegName = (text: string) => text.replace('-', '').replace('_', '').replace(' ', '').toLowerCase();

export const saveFile = (data: any, filename?: string) => {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    FileSaver.saveAs(blob, filename);
};

export const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB'];
    const size = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, size)).toFixed(2)} ${units[size]}`;
};
