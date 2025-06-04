/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

const navigation: FuseNavigationItem[] = [
    /* {
        id: 'dashboard',
        title: 'Administrativo',
        type: 'basic',
        icon: 'mat_outline:dashboard',
        link: '/apps/dashboards',
    }, */
    {
        id: 'administrative',
        title: 'Administrativo',
        type: 'group',
        icon: 'supervisor_account',
        children: [
            {
                id: 'buyVehicle',
                title: 'Compra Veiculo',
                type: 'basic',
                link: '/apps/compra-veiculo',
                icon: 'car_rental',
            },
            {
                id: 'sellVehicle',
                title: 'Venda Veiculo',
                type: 'basic',
                link: '/apps/venda-veiculo',
                icon: 'monetization_on',
            },
            {
                id: 'exchangeVehicle',
                title: 'Troca Veiculo',
                type: 'basic',
                link: '/apps/troca-veiculo',
                icon: 'swap_horiz',
            },
            {
                id: 'vehicle',
                title: 'Veiculo',
                type: 'basic',
                link: '/apps/veiculo',
                icon: 'directions_car',
            },
            // instituição
            // usuários
        ],
    },
    {
        id: 'settings',
        title: 'Configurações',
        type: 'group',
        icon: 'settings',
        children: [
            {
                id: 'userManagement',
                title: 'Gerenciamento de usuário',
                type: 'basic',
                link: '/apps/settings/user-management/list',
                icon: 'mat_outline:supervisor_account',
            },
            {
                id: 'suppliers',
                title: 'Fornecedores',
                type: 'basic',
                link: '/apps/settings/suppliers/list',
                icon: 'mat_outline:local_shipping',
            },
            {
                id: 'financial',
                title: 'Financeira',
                type: 'basic',
                link: '/apps/settings/financial/list',
                icon: 'mat_outline:account_balance',
            },
            {
                id: 'fees',
                title: 'Taxas',
                type: 'basic',
                link: '/apps/settings/fees/list',
                icon: 'mat_outline:request_quote',
            },
            {
                id: 'brands',
                title: 'Marcas',
                type: 'basic',
                link: '/apps/settings/brands/list',
                icon: 'mat_outline:label',
            },
            {
                id: 'documentStatus',
                title: 'Status Documento',
                type: 'basic',
                link: '/apps/settings/status-documents/list',
                icon: 'mat_outline:description',
            },
            {
                id: 'places',
                title: 'Locais',
                type: 'basic',
                link: '/apps/settings/places/list',
                icon: 'mat_outline:place',
            },
            {
                id: 'branches',
                title: 'Filiais',
                type: 'basic',
                link: '/apps/settings/branches/list',
                icon: 'mat_outline:business',
            },
            // instituição
            // usuários
        ],
    },
    {
        id: 'search',
        title: 'Entidades',
        type: 'group',
        icon: 'view_list',
        children: [

            {
                id: 'UserInstitution',
                title: 'Usuario Instituicao',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:group',
            },
            {
                id: 'Supplier',
                title: 'Fornecedor',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:local_shipping',
            },
            {
                id: 'FinanceCompany',
                title: 'Financeira',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:account_balance',
            },
            {
                id: 'Rates',
                title: 'Taxas',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'show_chart',
            },
            {
                id: 'Fuel',
                title: 'Combustivel',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:local_gas_station',
            },
            {
                id: 'Brand',
                title: 'Marca',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:label',
            },
            {
                id: 'DocumentStatus',
                title: 'Status Documento',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:description',
            },
            {
                id: 'Location',
                title: 'Local',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:place',
            },
            {
                id: 'Branch',
                title: 'Filial',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:business',
            },
            {
                id: 'BuyVehicle',
                title: 'Compra Veiculo',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:shopping_cart',
            },
            {
                id: 'SellVehicle',
                title: 'Venda Veiculo',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:attach_money',
            },
            {
                id: 'ExchangeVehicle',
                title: 'Troca Veiculo',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:swap_horiz',
            },
            {
                id: 'Vehicle',
                title: 'Veiculo',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:directions_car',
            },
        ],
    },
   /*  {
        id: 'services',
        title: 'Administração',
        type: 'group',
        icon: 'business',
        children: [
            {
                id: 'establishments',
                title: 'Estabelecimentos',
                type: 'basic',
                link: '/apps/search/establishments/list',
                icon: 'heroicons_outline:users',
            },
        ],
    }, */
];

export const defaultNavigation: FuseNavigationItem[] = [...navigation];
export const compactNavigation: FuseNavigationItem[] = [...navigation];
export const futuristicNavigation: FuseNavigationItem[] = [...navigation];
export const horizontalNavigation: FuseNavigationItem[] = [...navigation];
