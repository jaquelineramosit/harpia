const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const segmentosmercado = await connection('segmentosmercado').select('*');
    
        return response.json(segmentosmercado);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const segmentosmercado = await connection('segmentosmercado')
            .where('id', id)
            .select()
            .first();
    
        return response.json(segmentosmercado);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomesegmento, ativo } = request.body;
        
        const [id] = await connection('segmentosmercado').insert({
            nomesegmento,                
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
        
        const { nomesegmento, ativo } = request.body;

        await connection('segmentosmercado').where('id', id).update({
            nomesegmento,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};