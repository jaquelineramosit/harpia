const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const anotacoes = await connection('anotacoes').select('*');
    
        return response.json(anotacoes);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const anotacoes = await connection('anotacoes')
            .where('id', id)
            .select()
            .first();
    
        return response.json(anotacoes);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { anotacao, clienteId, oportunidadeId, contatoId, cancelada } = request.body;
        
        const [id] = await connection('anotacoes').insert({
                anotacao,
                clienteId,
                oportunidadeId,
                contatoId,
                cancelada,
                dataUltModif,
                usuarioId
        })

        return response.json({ id });
    },
    
        async update (request, response) {
            const   { id }   = request.params;
            const  usuarioId  = request.headers.authorization;
            const  dataUltModif = getDate();
            const { anotacao, clienteId, oportunidadeId, contatoId, cancelada } = request.body;
    
            await connection('anotacoes').where('id', id).update({
                anotacao,
                clienteId,
                oportunidadeId,
                contatoId,
                cancelada,
                dataUltModif,
                usuarioId
            });           

            return response.status(204).send();
        },
    };