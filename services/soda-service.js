const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.autoCommit = true;

module.exports = class SodaService {
    constructor() { }
    static async init() {
        console.log(`process.env.DB_USER: ${process.env.DB_USER}`);
        console.log(`process.env.DB_PASSWORD: ${process.env.DB_PASSWORD}`);
        console.log(`process.env.CONNECT_STRING: ${process.env.CONNECT_STRING}`);

        console.log('Creando pool de conexiones...')
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.CONNECT_STRING,
        });
        console.log('Pool de conexiones creado.')
        return new SodaService();
    }

    async getAllCollections() {
        let connection;
        try {
            connection = await oracledb.getConnection();
            const soda = connection.getSodaDatabase();
            console.log('soda a sido obtenida: ',soda); // <- verficar que soda no sea null
        
            // Obtener los nombres de todas las colecciones
            const collectionNames = soda.getCollectionNames({},(err,names)=> {
                console.log('obteniendo los nombres de las colecciones');
                if (err) {
                    console.error('Ha ocurrido un error: ',err);
                    throw err;
                }
                console.log('Nombres de las colecciones: ', names);
            });
        
            console.log('Nombres de las colecciones: ', collectionNames);

            return collectionNames;
        } catch (err) {
            console.error("Ha ocurrido un error: ", err);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}