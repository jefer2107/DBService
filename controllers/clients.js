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

    const descTable = ()=>{
        return new Promise((res,rej)=>{
            connection.query(`desc ${table}`,(error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const alterTableRenameTo = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} rename to ${body.table}`,(error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const dropTable = ()=>{
        return new Promise((res,rej)=>{
            connection.query(`drop table ${table}`,(error,result)=>{

                if(error) return rej(error)

                return res(result)
            })
        })
    }

    //Columns

    const alterTableAddColumn = (body)=>{
        const column = body.column
        const position = (!body.position?'':body.position)
        const of = (!body.of?'':body.of)

        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} add column ${column} ${position} ${of}`,(error,result)=>{

                if(error)
                {
                    return rej(error)
                }

                return res(result)
            })
        })
        
    }

    const alterTableForeignKey = (body)=>{
        const foreignKey = body.foreignKey
        const references = body.TableReferences
        const field = body.field

        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} add foreign key(${foreignKey}) references ${references}(${field})`,
            (error,result)=>{

                if(error)
                {
                    return rej(error)
                }

                return res(result)
            })
        })
    }

    const createColumnForForeignKey = (body)=>{
        const foreignKey = body.column.replace(" int","")
        const newBody = {...body,foreignKey}
        let resultAddColumn;
        let resultTableForeignKey;

        return new Promise(async(res,rej)=>{
            const addColumn = await alterTableAddColumn(body)
            .then((x)=>{
                resultAddColumn = true
                return x
            })
            .catch((error)=>{
                resultAddColumn = false
                return error
            })

            if(!resultAddColumn) return rej(addColumn)

            if(resultAddColumn) {

                const tableForeignKey = await alterTableForeignKey(newBody)
                .then((x)=>{
                    resultTableForeignKey = true
                    return x
                })
                .catch((error)=>{
                    resultTableForeignKey = false
                    return error
                })

                if(!resultTableForeignKey) return rej(tableForeignKey)

                return res(tableForeignKey)
                
            }
            
        })
        
    }

    const modifyColumn = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} modify column ${body.column}`,(error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const changeColumn = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} change column ${body.column} ${body.to}`,
            (error,result)=>{
                if(error) return rej(error)

                return res(result)
            })
        })
    }

    const dropColumn = (body)=>{
        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} drop column ${body.column}`,
            (error,result)=>{

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
        descTable,
        alterTableRenameTo,
        dropTable,
        alterTableAddColumn,
        alterTableForeignKey,
        createColumnForForeignKey,
        modifyColumn,
        changeColumn,
        dropColumn,
        getAll,
        create,
        getOne,
        removeItem,
        addForeignKey
    }
}

module.exports = factoryControllerClients