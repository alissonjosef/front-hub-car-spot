
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
}


export interface EcommpareUser {
    companyId: number;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    menuItem: any[];
    password: string | null;
}
