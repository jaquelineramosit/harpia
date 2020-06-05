const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const cargos = await connection('cargos')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select('*');
    
        return response.json(cargos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const cargos = await connection('cargos')
            .where('id', id)
            .select()
            .first();
    
        return response.json(cargos);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomecargo, ativo } = request.body;
        
        const [id] = await connection('cargos').insert({
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
        
        const { nomecargo, ativo } = request.body;

        await connection('cargos').where('id', id).update({
            nomecargo,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('cargos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }

};