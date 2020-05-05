const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const metasvendedores = await connection('metasvendedores').select('*');
    
        return response.json(metasvendedores);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const metasvendedores = await connection('metasvendedores')
            .where('id', id)
            .select()
            .first();
    
        return response.json(metasvendedores);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { vendedorId, metaId, observacao, ativo } = request.body;
        
        const [id] = await connection('metasvendedores').insert({
            vendedorId,
            metaId,
            observacao,
            nomecargo,                
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
        
        const { vendedorId, metaId, observacao, ativo } = request.body;

        await connection('metasvendedores').where('id', id).update({
            vendedorId,
            metaId,
            observacao,
            nomecargo,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};