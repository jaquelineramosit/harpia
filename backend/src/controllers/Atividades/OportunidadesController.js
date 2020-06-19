const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const oportunidades = await connection('oportunidades')
        .leftJoin( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
        .leftJoin( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
        .leftJoin( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
        .leftJoin( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )
        .leftJoin( 'usuario' , 'usuario.id' , '=' , 'oportunidades.proprietarioId' )
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select([
            'oportunidades.*',
            'clientes.nomecliente',
            'produtos.nomeproduto',
            'contatos.nomecontato',
            'fasespipe.nomefase',
            'usuario.nome as nomevendedor',
            'usuario.sobrenome as sobrenomevendedor',
        ]);
    
        console.log(oportunidades.count);
        return response.json(oportunidades);
    },

    async getAllByFasePipeId (request, response) {
        const  { fasepipeId }  = request.params;
        const oportunidades = await connection('oportunidades')
        .where('fasespipe.id', fasepipeId)
        .leftJoin( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
        .leftJoin( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
        .leftJoin( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
        .leftJoin( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )        
        .select([
            'oportunidades.*',
            'clientes.nomecliente',
            'produtos.nomeproduto',
            'contatos.nomecontato',
            'fasespipe.nomefase',
            'usuario.nome as nomevendedor',
            'usuario.sobrenome as sobrenomevendedor',
        ]);
            
        return response.json(oportunidades);
    },

    async getCountByFasePipeId (request, response) {
        const  { fasepipeId }  = request.params;        
        const [count] = await connection('oportunidades')
        //const oportunidades = await connection('oportunidades')
        .where('oportunidades.fasepipeId', fasepipeId)
        .leftJoin( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
        .leftJoin( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
        .leftJoin( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
        .leftJoin( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )
        .count()                
        return response.json(count['count(*)']);        
    },

    async getTotalByFasePipeId (request, response) {
        const  { fasepipeId }  = request.params;
        const [total] = await connection('oportunidades')
        //const oportunidades = await connection('oportunidades')
        .where('oportunidades.fasepipeId', fasepipeId)
        .leftJoin( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
        .leftJoin( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
        .leftJoin( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
        .leftJoin( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )               
        .sum('oportunidades.valor as total');
        return response.json(total);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const oportunidades = await connection('oportunidades')
            .where('oportunidades.id', id)
            .leftJoin( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
            .leftJoin( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
            .leftJoin( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
            .leftJoin( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )
            .select([
                'oportunidades.*',
                'clientes.nomecliente',
                'produtos.nomeproduto',
                'contatos.nomecontato',
                'fasespipe.nomefase',
                'usuario.nome as nomevendedor',
                'usuario.sobrenome as sobrenomevendedor',
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