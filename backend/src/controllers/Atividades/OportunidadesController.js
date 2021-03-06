const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const oportunidades = await connection('oportunidades')
        .leftJoin( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId' )
        .leftJoin( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId' )
        .leftJoin( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId' )
        .leftJoin( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId' )
        .leftJoin( 'usuario' , 'usuario.id' , '=' , 'oportunidades.proprietarioId' )
        .select([
            'oportunidades.*',
            'clientes.nomecliente',
            'produtos.nomeproduto',
            'contatos.nomecontato',
            'fasespipe.nomefase',
            'usuario.nome as nomeproprietario',
            'usuario.sobrenome as sobrenomeproprietario'
        ]);
    
        console.log(oportunidades.count);
        return response.json(oportunidades);
    },

    async getAllByFasePipeId (request, response) {
        const  { fasepipeId }  = request.params;
        const oportunidades = await connection('oportunidades')
        .where('fasespipe.id', fasepipeId)
        .join('usuario' , 'usuario.id' , '=' , 'oportunidades.usuarioId')
        .leftJoin( 'clientes', 'clientes.id' , '=' , 'oportunidades.clienteId')
        .leftJoin( 'produtos', 'produtos.id' , '=', 'oportunidades.produtoId')
        .leftJoin( 'contatos', 'contatos.id' , '=' , 'oportunidades.contatoId')
        .leftJoin( 'fasespipe' , 'fasespipe.id' , '=' , 'oportunidades.fasepipeId')                
        .select([
            'oportunidades.*',
            'clientes.nomecliente',
            'produtos.nomeproduto',
            'contatos.nomecontato',
            'fasespipe.nomefase',
            'usuario.nome as nomeproprietario',
            'usuario.sobrenome as sobrenomeproprietario'
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
            .join('usuario' , 'usuario.id' , '=' , 'oportunidades.usuarioId')
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
                'usuario.nome as nomeproprietario',
                'usuario.sobrenome as sobrenomeproprietario'
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
                motivoperdaId, valor, temperaturafechamentoId,
                expectativafechamento,
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
                temperaturafechamentoId,
                expectativafechamento,
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
            produtoId, fasepipeId, expectativafechamento,
            motivoperdaId, valor, temperaturafechamentoId,
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
            expectativafechamento,
            temperaturafechamentoId,
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
        return response.json(count['count(*)']);        
    }
};