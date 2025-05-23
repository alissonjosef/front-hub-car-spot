const fs = require('fs');
const path = require('path');

// Obter o ambiente do argumento ou usar "development" como padrão
let env = process.env.ANGULAR_ENV || process.env.ENV;
console.log(`🌍 Ambiente solicitado: ${env}`);

if(!env) {
    console.log(`❌ Ambiente não pode ser carregado: ${env}`);
    env = 'local'
}

console.log(`🌍 Ambiente a ser carregado: ${env}`);
const envFilePath = path.resolve(__dirname, `../src/environments/env.${env}.ts`);

try {
    // Ler o arquivo do ambiente correspondente
    const envContent = fs.readFileSync(envFilePath, 'utf-8');
    console.log(`🚀 Ambiente carregado: ${env}`);
    console.log('----------------------------------------');
    console.log(envContent);
    console.log('----------------------------------------');
} catch (error) {
    // Exibir o erro, mas evitar logs redundantes
    if (error.code === 'ENOENT') {
        console.warn(`⚠️ Arquivo do ambiente (${env}) não encontrado. Pulando.`);
    } else {
        console.error(`❌ Erro ao carregar o arquivo de ambiente (${env}):`, error.message);
    }
}
