const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const cargos = await connection('cargos').select('*');
    
        return response.json(cargos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const cargos = await connection('cargos')
            .where('id', id)
            .select()
            .first();
    
        return response.json(cargos);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomepais, sigla, moeda, siglamoeda, ativo } = request.body;
        
        const [id] = await connection('cargos').insert({
            nomepais,
            sigla, 
            moeda, 
            siglamoeda,
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
        
        const { nomepais, sigla, moeda, siglamoeda, ativo } = request.body;

        await connection('cargos').where('id', id).update({
            nomepais,
            sigla, 
            moeda, 
            siglamoeda,
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};