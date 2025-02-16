module.exports = {
    dialect: 'postgres',
    host: 'localhost',  
    port: 5432,
    username: 'postgres',
    password: 'red',
    database: 'onnmoveis',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
}