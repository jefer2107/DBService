

const routes = (app)=>{
    
    //clients
    const controllerFactoryClients = require('./controllers/clients')
    const factoryClients = controllerFactoryClients()

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
    app.get('/clients/:id/getOne',factoryClients.getOne)
    app.patch('/clients/:id/relateCourse',factoryClients.relateCourse)
    app.put('/clients/:id/changeAll',factoryClients.changeAll)
    app.patch('/clients/:id/changeOne',factoryClients.changeOne)
    app.put('/clients/createAndAddForeignKey',factoryClients.createAndAddForeignKey)

    //courses
    const factoryControllerCourses = require('./controllers/courses')
    const factoryCourses = factoryControllerCourses()

    app.get('/courses/describeTable',factoryCourses.describeTable)
    app.put('/courses/renameTable',factoryCourses.renameTable)
    app.delete('/courses/deleteTable',factoryCourses.deleteTable)
    app.post('/courses/addTable',factoryCourses.addTable)
    app.put('/courses/addColumn',factoryCourses.addColumn)
    app.delete('/courses/deleteColumn',factoryCourses.deleteColumn)
    app.put('/courses/changeColumn',factoryCourses.changeColumn)
    app.patch('/courses/renameColumn',factoryCourses.renameColumn)
    app.put('/courses/createForeignKey',factoryCourses.createForeignKey)
    app.get('/courses',factoryCourses.getAll)
    app.post('/courses',factoryCourses.create)
    app.delete('/courses/:id/removeItem',factoryCourses.removeItem)
    app.get('/courses/:id/getOne',factoryCourses.getOne)
    app.patch('/courses/:id/relateCourse',factoryCourses.relateCourse)
    app.put('/courses/:id/changeAll',factoryCourses.changeAll)
    app.patch('/courses/:id/changeOne',factoryCourses.changeOne)
    app.put('/courses/createAndAddForeignKey',factoryCourses.createAndAddForeignKey)
}

module.exports = routes