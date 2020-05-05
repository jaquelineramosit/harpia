const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const oportunidades = await connection('oportunidades').select('*');
    
        return response.json(oportunidades);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const oportunidades = await connection('oportunidades')
            .where('id', id)
            .select()
            .first();
    
        return response.json(oportunidades);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomeoportunidade, proprietarioId,
                clienteId, contatoId, 
                produtoId, fasepipeId,
                motivoperdaId, valor, expectativafechamentoId,
                anexoId, descricao, ativo } = request.body;
        
        const [id] = await connection('oportunidades').insert({
                nomeoportunidade,
                proprietarioId,
                clienteId, 
                contatoId, 
                produtoId, 
                fasepipeId,
                motivoperdaId, 
                valor, 
                expectativafechamentoId,
                anexoId, 
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
        
        const { nomeoportunidade, proprietarioId,
            clienteId, contatoId, 
            produtoId, fasepipeId,
            motivoperdaId, valor, expectativafechamentoId,
            anexoId, descricao, ativo } = request.body;

        await connection('oportunidades').where('id', id).update({
            nomeoportunidade,
            proprietarioId,
            clienteId, 
            contatoId, 
            produtoId, 
            fasepipeId,
            motivoperdaId, 
            valor, 
            expectativafechamentoId,
            anexoId, 
            descricao,
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};