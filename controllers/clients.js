const DBSevice = require('../DBSevice')
const {response, emailFormat} = require('../response')

const controllerFactoryClients = ()=>{
    const options = {
        table: 'clients',
        orderBy: 'id' 
    }

    let dbService = DBSevice(options)

    //Table

    const describeTable = (req,res)=>{
        dbService.descTable().then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const renameTable = (req,res)=>{
        const body = {
            table: req.body.table
        }

        dbService.alterTableRenameTo(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const deleteTable = (req,res)=>{
        dbService.dropTable().then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const addTable = (req,res)=>{
        const body = [
            req.body.date,
            req.body.name,
            req.body.address,
            req.body.email,
            req.body.telephone
        ]

        dbService.createTable(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    //Columns

    const addColumn = (req,res)=>{
        const body = {
            column: req.body.column,
            position: req.body.position,
            of: req.body.of
        }

        dbService.alterTableAddColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const createAndAddForeignKey = (req,res)=>{
        const body = {
            column: req.body.column,
            TableReferences: req.body.TableReferences,
            field: req.body.field
        }

        dbService.createColumnForForeignKey(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log("clients error: ",error)
        })
    }

    const deleteColumn = (req,res)=>{
        const body = {
            column: req.body.column
        }

        dbService.dropColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const changeColumn = (req,res)=>{
        const body = {
            column: req.body.column
        }

        dbService.modifyColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const renameColumn = (req,res)=>{
        const body = {
            column: req.body.column,
            to: req.body.to
        }

        dbService.changeColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const createForeignKey = (req,res)=>{
        const body = {
            column: req.body.column,
            TableReferences: req.body.references
        }

        dbService.alterTableForeignKey(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    //Values

    const getAll = (req,res)=>{
        const body = [req.body.columns]

        dbService.selectAll(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
        
    }

    const create = (req,res)=>{
        const body = {
            columns: ['date','name','address','email','telephone'],
            values: [new Date(),req.body.name,req.body.address,req.body.email,req.body.telephone]
        }

        emailFormat(req.body.email)

        dbService.insert(body).then((result)=>{
            response(res).send(result)
            
        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
        
    }

    const removeItem = (req,res)=>{
        const id = req.params.id

        dbService.deleteItem(id).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const getOne = (req,res)=>{
        const id = req.params.id

        dbService.selectOne(id).then((result)=>{
            response(res).send(result)
            
        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const relateProject = (req,res)=>{
        const id = req.params.id
        const body = {
            column: req.body.column,
            id: req.body.id
        }

        dbService.updateTableForeignKey(body,id).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const changeAll = (req,res)=>{
        const body = {
            columns:['date','name','address','email','telephone'],
            values:[req.body.date,req.body.name,req.body.address,req.body.email,req.body.telephone]
        }

        const id = req.params.id

        dbService.updateChange(body,id).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const changeOne = (req,res)=>{
        const body = {
            columns:['idPojects'],
            values:[req.body.idPojects]
        }

        const id = req.params.id

        dbService.updateChange(body,id).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    return {
        describeTable,
        renameTable,
        deleteTable,
        addTable,
        addColumn,
        deleteColumn,
        changeColumn,
        renameColumn,
        createForeignKey,
        getAll,
        create,
        removeItem,
        getOne,
        relateProject,
        changeAll,
        changeOne,
        createAndAddForeignKey
    }
}

module.exports = controllerFactoryClients