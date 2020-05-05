const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const expectativasfechamento = await connection('expectativasfechamento').select('*');
    
        return response.json(expectativasfechamento);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const expectativasfechamento = await connection('expectativasfechamento')
            .where('id', id)
            .select()
            .first();
    
        return response.json(expectativasfechamento);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { expectativafechamento, ativo } = request.body;
        
        const [id] = await connection('expectativasfechamento').insert({
                expectativafechamento,                
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
        
        const { expectativafechamento, ativo } = request.body;

        await connection('expectativasfechamento').where('id', id).update({
            expectativafechamento,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};