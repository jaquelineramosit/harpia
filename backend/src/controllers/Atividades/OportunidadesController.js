const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const oportunidades = await connection('oportunidades')
        .join( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
        .join( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
        .join( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
        .join( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select([
            'oportunidades.*',
            'clientes.nomecliente',
            'produtos.nomeproduto',
            'contatos.nomecontato',
            'fasespipe.nomefase',
        ]);
    
        return response.json(oportunidades);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const oportunidades = await connection('oportunidades')
            .where('oportunidades.id', id)
            .join( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
            .join( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
            .join( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
            .join( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )
            .select([
                'oportunidades.*',
                'clientes.nomecliente',
                'produtos.nomeproduto',
                'contatos.nomecontato',
                'fasespipe.nomefase',
            ])
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
    async getCount (request,response) {        

        const [count] = await connection('oportunidades').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};