const mysql2 = require('mysql2')

const querySqlServer = (req)=>{
   
    const connection = mysql2.createConnection({
        host:'localhost',
        user:'root',
        database:'querySqlserver'
    })

    const selectAll = (options)=>{
        return new Promise((res,rej)=>{
            connection.query(`select * from ${options.route} order by ${options.orderBy}`,(error,result)=>{
                if(error)
                {
                    return rej(error)
                    
                }
    
                return res(result)
            })
        }) 
        
    }

    const insert = (options,body)=>{
        const route = options.route
        const columns = body.columns
        const columnsStringify = JSON.stringify(columns)
        const setColumns = columnsStringify.replace("[","").replace("]","").replace(/"/g,"")
        const values = body.values
        let columnsLength = columns.length

        return new Promise((res,rej)=>{
            let setValues = '?'
            let count = 1
            let typeInsert;

            if(columns.length === 1){
                typeInsert = 'simple'
                count = 0
            }
            
            columns.forEach(()=>{
                count++
                if(typeInsert !== 'simple') setValues = `?,${setValues}`
                
                if(columnsLength === count){
                    
                    connection.query(`insert into ${route}(${setColumns})values(${setValues})`,
                    values,(error,result)=>{

                        if(error)
                        {
                            return rej(error)
                        }
        
                        return res(result)
                    })
                }
                
            })
            
            
        })
        
    }

    const deleteItem = (options)=>{
        const id = req.params.id

        return new Promise((res,rej)=>{
            connection.query(`delete from ${options.route} where id=${id}`,(error,result)=>{

                if(error)
                {
                    return rej(error)
                }
    
                return res(result)
            })
        })
    }

    const selectOne = (options)=>{
        const id = req.params.id
        
        return new Promise((res,rej)=>{
            connection.query(`select * from ${options.route} where id=${id}`,(error,result)=>{

                if(error)
                {
                    return rej(error)
                }
    
                return res(result)
            })
        })
    }

    const updateTableForeignKey = (options,body)=>{
        const id = req.params.id
        const route = options.route
        const foreignKey = body.foreignKey
        const idReference = body.id

        return new Promise((res,rej)=>{
            connection.query(`update ${route} set ${foreignKey} = '${idReference}' where id ='${id}'`,(error,result)=>{

                if(error)
                {
                    return rej(error)
                }

                return res(result)
            })
        })
        
    }

    const alterTableAddColumn = (options,body)=>{
        const route = options.route
        const column = body.column
        const position = body.position

        return new Promise((res,rej)=>{
            connection.query(`alter table ${route} add column ${column} ${position}`,(error,result)=>{

                if(error)
                {
                    return rej(error)
                }

                return res(result)
            })
        })
        
    }

    const alterTableForeignKey = (options,body)=>{
        const route = options.route
        const foreignKey = body.foreignKey
        const references = body.references
        const field = body.field

        return new Promise((res,rej)=>{
            connection.query(`alter table ${route} add foreign key(${foreignKey}) references ${references}${(field)}`,
            (error,result)=>{

                if(error)
                {
                    return rej(error)
                }

                return res(result)
            })
        })
    }

    return {
        selectAll,
        insert,
        deleteItem,
        selectOne,
        alterTableAddColumn,
        alterTableForeignKey,
        updateTableForeignKey,
        connection
    }
}

module.exports = querySqlServer

