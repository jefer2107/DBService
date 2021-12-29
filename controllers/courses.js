const DBSevice = require("../DBSevice")

const factoryControllerCourses = ()=>{
    const options = {
        table: 'courses',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const getAll = (req,res)=>{
        dbService.selectAll(options).then((result)=>{
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

    return{
        getAll,
        create,
        getOne,
        removeItem
    }
}

module.exports = factoryControllerCourses