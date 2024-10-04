import * as url from "url"

const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url))
}

export const products = [
    { id: [], title:'', description:'', code:'', price:'', stock:'', category:'' },
    
];

export default config