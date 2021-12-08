const mysql2 = require('mysql2')

const configDatabaseMysql = (config)=>{
    // const host = config.host
    // const user = config.user
    // const database = config.database
    
    const configMysql = mysql2.createConnection({
        host:'localhost',
        user:'root',
        database:'querySqlserver'
    })

    console.log('host: ',host)

    return configMysql
}

module.exports = configDatabaseMysql