import { env as envDev } from './env.dev';
import { env as envHml } from './env.hml';
import { env as envLab } from './env.lab';


const envApi  = {
    envDev: envDev,
    envHml,
    envLab
}


export const env = {
    name: 'local',
    production: false,
    isDev: true,
    api: envApi.envHml.api,
    auth: {
        clientId: '',
        clientSecret: '',
        grantType: '',
        url: '',
    },
    regulatories: [''],
    vercel: {
        url: ``,
    },
};
