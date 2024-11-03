import * as url from 'url';


const config = {
    PORT: 5050,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    MONGO_URL: "mongodb+srv://usuario:contraseña@cluster0.mongodb.net/nombreDeTuBaseDeDatos?retryWrites=true&w=majority",
};



export const users = [
    { id: 1, firstName: 'Juan', lastName: 'Perez' },
    { id: 2, firstName: 'Carlos', lastName: 'Perren' },
    { id: 3, firstName: 'Luis', lastName: 'Gonzalez' }
];


export default config;