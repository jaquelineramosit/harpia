const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const marcas = await connection('marcas')
        .select('*');
    
        return response.json(marcas);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const marcas = await connection('marcas')
            .where('id', id)
            .select()
            .first();
    
        return response.json(marcas);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomemarca, nacional, ativo } = request.body;
        
        const [id] = await connection('marcas').insert({
            nomemarca, 
            nacional,               
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
        
        const { nomemarca, nacional, ativo } = request.body;

        await connection('marcas').where('id', id).update({
            nomemarca, 
            nacional,               
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    
 async getCount (request,response) {        

    const [count] = await connection('marcas').count()
    const { page = 1 } = request.query;
    return response.json(count['count(*)']);        
}


};