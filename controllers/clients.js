const DBSevice = require("../DBSevice")

const factoryControllerClients = ()=>{
    
    const options = {
        table: 'clients',
        orderBy: 'id' 
    }

    let dbService = DBSevice(options)

    //Table

    const createTable = (body)=>{
        const columns = body.toString()
        console.log('createTable columns :',columns)

        return new Promise((res,rej)=>{
            connection.query(`create table ${table}(${columns})`,(error,result)=>{

                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const getAll = (req,res)=>{
        dbService.selectAll().then((result)=>{
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

        dbService.insert(body).then((result)=>{
            res.status(200).send(result)
            
        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)
        })
        
    }

    const getOne = (req,res)=>{
        const id = req.params.id

        dbService.selectOne(id).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
        })
    }

    const removeItem = (req,res)=>{
        const id = req.params.id

        dbService.deleteItem(id).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
        })
    }

    const addForeignKey = (req,res)=>{
        const id = req.params.id
        const body = {
            foreignKey: req.body.foreignKey,
            id: req.body.id
        }

        dbService.updateTableForeignKey(body,id).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    return{
        createTable,
        getAll,
        create,
        getOne,
        removeItem,
        addForeignKey
    }
}

module.exports = factoryControllerClients