
const response = (res)=>{
    const send = (value)=> res.status(200).send(value)
    const error = ()=> res.status(500).send(`Um erro crítico ocorreu!`)
    const unauthorize = ()=> res.status(401).send('Não autorizado!')
    const forbiden = ()=> res.status(403).send('Acesso negado!')

    return {
        send,
        error,
        unauthorize,
        forbiden
    }
}

const emailFormat = (email)=>{
    const characters = ['@','.','com']
    if(!email) throw Error('email not informed')
    if(email.length > 30) throw Error('Email cannot contain more than 30 characters')
    
    characters.map(e=> {if(!email.includes(e)) 
        throw Error(`this email format does not exist`)})
           
}

module.exports = {
    response,
    emailFormat
}