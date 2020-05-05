const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const tiposcontato = await connection('tiposcontato').select('*');
    
        return response.json(tiposcontato);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const tiposcontato = await connection('tiposcontato')
            .where('id', id)
            .select()
            .first();
    
        return response.json(tiposcontato);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { tipocontato, ativo } = request.body;
        
        const [id] = await connection('tiposcontato').insert({
            tipocontato, 
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
        
        const { tipocontato, ativo } = request.body;

        await connection('tiposcontato').where('id', id).update({
            tipocontato, 
            descricao,               
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};