const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const anotacoes = await connection('anotacoes')
        .join( 'clientes' , 'clientes.id' , '=' , 'anotacoes.clienteId')
        .join( 'oportunidades' , 'oportunidades.id' , '=' , 'anotacoes.oportunidadeId')
        .join( 'contatos' , 'contatos.id' , '=' , 'anotacoes.contatoId')
        .select([
            'anotacoes.*',
            'clientes.nomecliente',
            'oportunidades.nomeoportunidade',
            'contatos.nomecontato'
        ]);
    
        return response.json(anotacoes);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const anotacoes = await connection('anotacoes')
            .where('anotacoes.id', id)
            .join( 'clientes' , 'clientes.id' , '=' , 'anotacoes.clienteId')
            .join( 'oportunidades' , 'oportunidades.id' , '=' , 'anotacoes.oportunidadeId')
            .join( 'contatos' , 'contatos.id' , '=' , 'anotacoes.contatoId')
            .select([
                'anotacoes.*',
                'clientes.nomecliente',
                'oportunidades.nomeoportunidade',
                'contatos.nomecontato'
            ])
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
        async getCount (request,response) {        

            const [count] = await connection('anotacoes').count()
            const { page = 1 } = request.query;
            return response.json(count['count(*)']);        
        }
    };