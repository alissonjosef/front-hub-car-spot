/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

const navigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Painel de controle',
        type: 'basic',
        icon: 'mat_outline:dashboard',
        link: '/apps/dashboards',
    },
    {
        id: 'registrations',
        title: 'Cadastros',
        type: 'group',
        icon: 'edit_note',
        children: [
            {
                id: 'representatives',
                title: 'Representantes',
                type: 'basic',
                link: '/apps/registrations/representatives/list',
                icon: 'mat_outline:person_pin',
            },
            {
                id: 'payment-institution',
                title: 'Instituição de pagamento',
                type: 'basic',
                link: '/apps/registrations/institution/list',
                icon: 'mat_outline:account_balance',
            },
             {
                id: 'user-management',
                title: 'Usuários',
                type: 'basic',
                link: '/apps/registrations/user-management/list',
                icon: 'heroicons_outline:user',
            },
            // instituição
            // usuários
        ],
    },
    {
        id: 'search',
        title: 'Consulta',
        type: 'group',
        icon: 'search',
        children: [
            {
                id: 'establishments',
                title: 'Estabelecimentos',
                type: 'basic',
                link: '/apps/search/establishments/list',
                icon: 'heroicons_outline:users',
            },
        ],
    },
    {
        id: 'services',
        title: 'Serviços',
        type: 'group',
        icon: 'miscellaneous_services',
        children: [
            {
                id: 'movement',
                title: 'Movimentos',
                type: 'basic',
                link: '/apps/services/movement/dimp',
                icon: 'mat_outline:auto_awesome_motion',
            },
            {
                id: 'files',
                title: 'Arquivos',
                type: 'basic',
                link: '/apps/services/files',
                icon: 'mat_outline:cloud_upload',
            },
        ],
    },
];

export const defaultNavigation: FuseNavigationItem[] = [...navigation];
export const compactNavigation: FuseNavigationItem[] = [...navigation];
export const futuristicNavigation: FuseNavigationItem[] = [...navigation];
export const horizontalNavigation: FuseNavigationItem[] = [...navigation];
