export enum ERegulatory {
    DIMP = 0,
    DECRED = 3,
    RPS = 4,
    DOC_5817 = 7,
    DOC_6334 = 6,
    DOC_DIMP = 8,
    EFD_REINF = 9,
    CADOC_3040 = 10,
    DOC_SP = 11,
}

export interface Regulatory {
    type: ERegulatory;
    name: string;
}

export const REGULATORIES_LABEL: Regulatory[] = [
    {
        type: ERegulatory.DIMP,
        name: 'DIMP',
    },
    {
        type: ERegulatory.DECRED,
        name: 'DECRED',
    },
    {
        type: ERegulatory.RPS,
        name: 'RPS',
    },
    {
        type: ERegulatory.DOC_DIMP,
        name: 'DOC-DIMP',
    },
    {
        type: ERegulatory.DOC_5817,
        name: 'DOC-5817',
    },
    {
        type: ERegulatory.DOC_6334,
        name: 'DOC-6334',
    },
    {
        type: ERegulatory.EFD_REINF,
        name: 'EFD-REINF',
    },
    {
        type: ERegulatory.CADOC_3040,
        name: 'CADOC-3040',
    },
];

export const getRegulatoryType = (id: ERegulatory | string): Regulatory | undefined => {
    const normalize = (value: string): string => 
        value.replace(/[^a-z0-9]/gi, '').toLowerCase();

    return REGULATORIES_LABEL.find((regulatory) => {
        const normalizedType = normalize(regulatory.type.toString());
        const normalizedName = normalize(regulatory.name);
        const normalizedInput = normalize(id.toString());

        return normalizedType === normalizedInput || normalizedName === normalizedInput;
    });
};
