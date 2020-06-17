const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const departamentos = await connection('departamentos')
        .select('*');
    
        return response.json(departamentos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const departamentos = await connection('departamentos')
            .where('id', id)
            .select()
            .first();
    
        return response.json(departamentos);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { departamento, ativo } = request.body;
        
        const [id] = await connection('departamentos').insert({
                departamento,                
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
        
        const { departamento, ativo } = request.body;

        await connection('departamentos').where('id', id).update({
            departamento,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('departamentos').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }

};