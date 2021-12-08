const factoryControllerClients = require('./controllers/clients')

const routes = (app)=>{
    //clients
    app.get('/clients',factoryControllerClients().getAll)
    app.get('/clients/:id',factoryControllerClients().getOne)
    app.post('/clients',factoryControllerClients().create)
    app.delete('/clients/:id',factoryControllerClients().removeItem)

    //courses
    app.get('/courses',factoryControllerClients().getAll)
    app.get('/courses/:id',factoryControllerClients().getOne)
    app.post('/courses',factoryControllerClients().create)
    app.delete('/courses/:id',factoryControllerClients().removeItem)
}

module.exports = routes