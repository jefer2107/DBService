const factoryControllerClients = require('./teste')

const routes = (app)=>{
    app.get('/clients',factoryControllerClients().getAll)
    app.post('/clients',factoryControllerClients().create)
}

module.exports = routes