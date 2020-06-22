const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const produtos = await connection('produtos')
        .join( 'marcas' , 'marcas.id' , '=' , 'produtos.marcaId')
        .leftJoin( 'distribuidores', 'distribuidores.id' , '=' , 'produtos.distribuidorId')
        .select([
            'produtos.*',
            'marcas.nomemarca',
            'distribuidores.nomedistribuidor'
        ]);
    
        return response.json(produtos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const produtos = await connection('produtos')
            .where('produtos.id', id)
            .join( 'marcas' , 'marcas.id' , '=' , 'produtos.marcaId')
            .leftJoin( 'distribuidores', 'distribuidores.id' , '=' , 'produtos.distribuidorId')
            .select([
                'produtos.*',
                'marcas.nomemarca',
                'distribuidores.nomedistribuidor'
            ])
            .first();
    
        return response.json(produtos);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();

        const { marcaId, nomeproduto, numerofabricante, quantidade, 
            valor, distribuidorId, tempoentrega, ativo } = request.body;
        
        const [id] = await connection('produtos').insert({
            marcaId,
            nomeproduto,
            numerofabricante,
            quantidade,
            valor,
            distribuidorId,
            tempoentrega, 
            ativo,
            dataultmodif,
            usuarioId
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioId  = request.headers.authorization;
        const  dataultmodif = getDate();
        
        const { marcaId, nomeproduto, numerofabricante, quantidade, 
            valor, distribuidorId, tempoentrega, ativo } = request.body;

        await connection('produtos').where('id', id).update({
            marcaId, 
            nomeproduto, 
            numerofabricante, 
            quantidade, 
            valor, 
            distribuidorId,
            tempoentrega, 
            ativo,
            dataultmodif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('produtos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};