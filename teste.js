const configDatabaseMysql = require("./configDatabase")
const querySqlServer = require("./querySqlserver")

// configDatabaseMysql({
//     host: 'localhost',
//     user: 'root',
//     database: 'querySqlserver'
// })

const factoryControllerClients = ()=>{
    const options = {
        route: 'clients',
        orderBy: 'id'
    }

    const getAll = (req,res)=>{
        querySqlServer(req).selectAll(options).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
        })
    }

    const create = (req,res)=>{
        const body = {
            columns: ['date','name','age'],
            values: [new Date(),req.body.name,req.body.age]
        }

        querySqlServer(req).insert(options,body).then((result)=>{
            res.status(200).send(result)
            
        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)
        })
        
    }

    const getOne = (req,res)=>{
        querySqlServer(req).selectOne(options).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
        })
    }

    return{
        getAll,
        create,
        getOne
    }
}

module.exports = factoryControllerClients