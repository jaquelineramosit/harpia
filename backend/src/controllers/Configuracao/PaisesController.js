const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const paises = await connection('paises')
        .select('*');
    
        return response.json(paises);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const paises = await connection('paises')
            .where('id', id)
            .select()
            .first();
    
        return response.json(paises);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { nomepais, sigla, moeda, siglamoeda, ativo } = request.body;
        
        const [id] = await connection('paises').insert({
            nomepais,
            sigla,
            moeda,
            siglamoeda,
            ativo,
            dataultmodif,
            usuarioId
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { nomepais, sigla, moeda, siglamoeda, ativo } = request.body;

        await connection('paises').where('id', id).update({
            nomepais,
            sigla, 
            moeda, 
            siglamoeda,
            ativo,
            dataultmodif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('paises').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }

};