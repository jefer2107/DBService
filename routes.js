

const routes = (app)=>{
    const factoryControllerClients = require('./controllers/clients')
    //clients
    app.get('/clients',factoryControllerClients().getAll)
    app.get('/clients/:id',factoryControllerClients().getOne)
    app.post('/clients',factoryControllerClients().create)
    app.delete('/clients/:id',factoryControllerClients().removeItem)
    app.patch('/clients/addForeignKey/:id',factoryControllerClients().addForeignKey)

    //courses
    const factoryControllerCourses = require('./controllers/courses')
    app.get('/courses',factoryControllerCourses().getAll)
    app.get('/courses/:id',factoryControllerCourses().getOne)
    app.post('/courses',factoryControllerCourses().create)
    app.delete('/courses/:id',factoryControllerCourses().removeItem)
}

module.exports = routes