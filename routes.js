

const routes = (app)=>{
    const controllerFactoryClients = require('./controllers/clients')
    const factoryClients = controllerFactoryClients()
    //clients

    app.get('/clients/describeTable',factoryClients.describeTable)
    app.put('/clients/renameTable',factoryClients.renameTable)
    app.delete('/clients/deleteTable',factoryClients.deleteTable)
    app.post('/clients/addTable',factoryClients.addTable)
    app.put('/clients/addColumn',factoryClients.addColumn)
    app.delete('/clients/deleteColumn',factoryClients.deleteColumn)
    app.put('/clients/changeColumn',factoryClients.changeColumn)
    app.patch('/clients/renameColumn',factoryClients.renameColumn)
    app.put('/clients/createForeignKey',factoryClients.createForeignKey)
    app.get('/clients',factoryClients.getAll)
    app.post('/clients',factoryClients.create)
    app.delete('/clients/:id/removeItem',factoryClients.removeItem)
    app.get('/clients/:id/getItem',factoryClients.getOne)
    app.patch('/clients/:id/relateProject/',factoryClients.relateProject)
    app.put('/clients/:id/changeAll',factoryClients.changeAll)
    app.patch('/clients/:id/changeOne',factoryClients.changeOne)
    app.put('/clients/createAndAddForeignKey',factoryClients.createAndAddForeignKey)

    //courses
    const factoryControllerCourses = require('./controllers/courses')
    app.get('/courses',factoryControllerCourses().getAll)
    app.get('/courses/:id',factoryControllerCourses().getOne)
    app.post('/courses',factoryControllerCourses().create)
    app.delete('/courses/:id',factoryControllerCourses().removeItem)
}

module.exports = routes