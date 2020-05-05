const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const tiposatividade = await connection('tiposatividade').select('*');
    
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
};