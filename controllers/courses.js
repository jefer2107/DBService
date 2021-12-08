const querySqlServer = require("../querySqlserver")

const factoryControllerCourses = ()=>{
    const options = {
        route: 'courses',
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
            columns: ['date','name'],
            values: [new Date(),req.body.name]
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

    return{
        getAll,
        create,
        getOne,
        removeItem
    }
}

module.exports = factoryControllerCourses