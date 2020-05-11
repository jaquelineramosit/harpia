const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const acessopagina = await connection('acessopagina').select('*');
    
        return response.json(acessopagina);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const acessopagina = await connection('acessopagina')
            .where('id', id)
            .select()
            .first();
    
        return response.json(acessopagina);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;        
        const  dataultmodif = getDate();

        const {perfilacessoId, moduloId, paginaId, ativo } = request.body;
        
        const [id] = await connection('acessopagina').insert({    
                perfilacessoId,
                moduloId,
                paginaId,                             
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

            const {perfilacessoId, moduloId, paginaId, ativo } = request.body;
    
            await connection('acessopagina').where('id', id).update({                
                perfilacessoId,
                moduloId,
                paginaId,                          
                ativo,
                dataultmodif,
                usuarioId
            });           

            return response.status(204).send();
        },
    };