const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const fasespipe = await connection('fasespipe')
        .join( 'pipes', 'pipes.id' , '=' , 'fasespipe.pipeId' )
        .select([
            'fasespipe.*',
            'pipes.nomepipe'
        ]);
    
        return response.json(fasespipe);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const fasespipe = await connection('fasespipe')
        .where('fasespipe.id', id)
        .join( 'pipes', 'pipes.id' , '=' , 'fasespipe.pipeId' )
        .select(['fasespipe.*','pipes.nomepipe'])
        .first();
    
        return response.json(fasespipe);
    },

    async getAllByPipeId (request, response) {
        const  { pipeId }  = request.params;
        
        const fasespipe = await connection('fasespipe')
        .where('fasespipe.pipeId', pipeId)
        .join( 'pipes', 'pipes.id' , '=' , 'fasespipe.pipeId' )
        .select([
            'fasespipe.*',
            'pipes.nomepipe'
        ]);

        return response.json(fasespipe);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomefase, pipeId, ativo } = request.body;
        
        const [id] = await connection('fasespipe').insert({
            nomefase,
            pipeId,                
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
        
        const { nomefase, pipeId, ativo } = request.body;

        await connection('fasespipe').where('id', id).update({
            nomefase,
            pipeId,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('fasespipe').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};