const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const tiposatividade = await connection('tiposatividade')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select('*');
    
        return response.json(tiposatividade);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tiposatividade = await connection('tiposatividade')
            .where('id', id)
            .select()
            .first();
    
        return response.json(tiposatividade);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { tipoatividade, descricao, ativo } = request.body;
        
        const [id] = await connection('tiposatividade').insert({
            tipoatividade, 
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
        
        const { tipoatividade, descricao, ativo } = request.body;

        await connection('tiposatividade').where('id', id).update({
            tipoatividade, 
            descricao,               
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('tiposatividade').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }

};