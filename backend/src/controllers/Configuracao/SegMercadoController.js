const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const segmentosmercado = await connection('segmentosmercado')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select('*');
    
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
    async getCount (request,response) {        

        const [count] = await connection('segmentosmercado').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};