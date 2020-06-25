const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const temperaturasfechamento = await connection('temperaturasfechamento')
        .select('*');
    
        return response.json(temperaturasfechamento);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const temperaturasfechamento = await connection('temperaturasfechamento')
            .where('id', id)
            .select()
            .first();
    
        return response.json(temperaturasfechamento);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { temperaturafechamento, ativo } = request.body;
        
        const [id] = await connection('temperaturasfechamento').insert({
                temperaturafechamento,                
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
        
        const { temperaturafechamento, ativo } = request.body;

        await connection('temperaturasfechamento').where('id', id).update({
            temperaturafechamento,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('temperaturasfechamento').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }

};