const querySqlServer = require("../querySqlserver")

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

    const removeItem = (req,res)=>{
        querySqlServer(req).deleteItem(options).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
        })
    }

    const addForeignKey = (req,res)=>{
        const body = {
            foreignKey: req.body.foreignKey,
            id: req.body.id
        }

        querySqlServer(req).updateTableForeignKey(options,body).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    return{
        getAll,
        create,
        getOne,
        removeItem,
        addForeignKey
    }
}

module.exports = factoryControllerClients