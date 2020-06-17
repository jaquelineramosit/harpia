const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const metas = await connection('metas')
        .select('*');
    
        return response.json(metas);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const metas = await connection('metas')
            .where('id', id)
            .select()
            .first();
    
        return response.json(metas);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomemeta, valor, qtdeoportunidade, descricao, ativo } = request.body;
        
        const [id] = await connection('metas').insert({
            nomemeta,
            valor, 
            qtdeoportunidade, 
            descricao,
            ativo,
            dataUltModif,
            usuarioId
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();
        
        const { nomemeta, valor, qtdeoportunidade, descricao, ativo } = request.body;

        await connection('metas').where('id', id).update({
            nomemeta,
            valor, 
            qtdeoportunidade, 
            descricao,
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('metas').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }

};