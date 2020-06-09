const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const motivosperda = await connection('motivosperda')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select('*');
    
        return response.json(motivosperda);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const motivosperda = await connection('motivosperda')
            .where('id', id)
            .select()
            .first();
    
        return response.json(motivosperda);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { motivoperda, ativo } = request.body;
        
        const [id] = await connection('motivosperda').insert({
            motivoperda,                
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
        
        const { motivoperda, ativo } = request.body;

        await connection('motivosperda').where('id', id).update({
            motivoperda,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('motivosperda').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }

};