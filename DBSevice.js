const mysql2 = require('mysql2')

const DBSevice = (options)=>{
    const table = options.table

    const connection = mysql2.createConnection({
        host:'localhost',
        user:'root',
        database:'querySqlserver'
    })

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

    //Values

    const selectAll = (body)=>{
        const columns = (body?body.toString():"")
        return new Promise((res,rej)=>{
            connection.query(`select ${(columns == ""?"*":columns)} from ${table} 
            order by ${options.orderBy}`,
            (error,result)=>{
                if(error)
                {
                    return rej(error)
                    
                }
    
                return res(result)
            })
        }) 
        
    }

    const insert = (body)=>{
        const columns = body.columns
        const setColumns = columns.toString()
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
                    
                    connection.query(`insert into ${table}(${setColumns})values(${setValues})`,
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

    const deleteItem = (id)=>{

        return new Promise((res,rej)=>{
            connection.query(`delete from ${table} where id=${id}`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
    }

    const selectOne = (id)=>{
        
        return new Promise((res,rej)=>{
            connection.query(`select * from ${table} where id=${id}`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
    }

    const updateTableForeignKey = (body,id)=>{
        const foreignKey = body.foreignKey
        const idReference = body.id

        return new Promise((res,rej)=>{
            connection.query(`update ${table} set ${foreignKey} = '${idReference}' where id ='${id}'`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
        
    }

    const alterTableAddColumn = (body)=>{
        const column = body.column
        const position = body.position

        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} add column ${column} ${position}`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
        
    }

    const alterTableForeignKey = (body)=>{
        const foreignKey = body.foreignKey
        const references = body.references
        const field = body.field

        return new Promise((res,rej)=>{
            connection.query(`alter table ${table} add foreign key(${foreignKey}) references ${references}${(field)}`,
            (error,result)=>{

                if(error) return rej(error)
    
                return res(result)
            })
        })
    }

    return {
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

module.exports = DBSevice

