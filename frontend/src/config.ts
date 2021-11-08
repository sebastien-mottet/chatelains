
let env = 'PROD';

let apiHost;

switch (env) {
    case 'DEV':
        apiHost = 'http://localhost:5000/';
        break;
    case 'PROD':
        apiHost = 'https://api.mottet.dev/';
        break;
}

const config = {
    apiHost: apiHost,
    apiRoot: apiHost + 'api',
}

export default config;