const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const fasespipe = await connection('fasespipe').select('*');
    
        return response.json(fasespipe);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const fasespipe = await connection('fasespipe')
            .where('id', id)
            .select()
            .first();
    
        return response.json(fasespipe);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomefase, pipeId, ativo } = request.body;
        
        const [id] = await connection('fasespipe').insert({
            nomefase,
            pipeId,                
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
        
        const { nomefase, pipeId, ativo } = request.body;

        await connection('fasespipe').where('id', id).update({
            nomefase,
            pipeId,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};