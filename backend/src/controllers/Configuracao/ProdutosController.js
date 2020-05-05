const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const pipes = await connection('pipes').select('*');
    
        return response.json(pipes);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const pipes = await connection('pipes')
            .where('id', id)
            .select()
            .first();
    
        return response.json(pipes);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { marcaId, nomeproduto, numerofabricante, quantidade, 
            valor, distribuidorId, tempoentrega, ativo } = request.body;
        
        const [id] = await connection('pipes').insert({
            marcaId, 
            nomeproduto, 
            numerofabricante, 
            quantidade, 
            valor, 
            distribuidorId,
            tempoentrega, 
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
        
        const { marcaId, nomeproduto, numerofabricante, quantidade, 
            valor, distribuidorId, tempoentrega, ativo } = request.body;

        await connection('pipes').where('id', id).update({
            marcaId, 
            nomeproduto, 
            numerofabricante, 
            quantidade, 
            valor, 
            distribuidorId,
            tempoentrega, 
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};