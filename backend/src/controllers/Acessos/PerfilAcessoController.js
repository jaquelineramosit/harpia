const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const perfilacesso = await connection('perfilacesso').select('*');
    
        return response.json(perfilacesso);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const perfilacesso = await connection('perfilacesso')
            .where('id', id)
            .select()
            .first();
    
        return response.json(perfilacesso);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;        
        const  dataUltModif = getDate();

        const {perfil, descricao, ativo } = request.body;
        
        const [id] = await connection('perfilacesso').insert({                
                perfil,
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

            const {perfil, descricao, ativo } = request.body;
    
            await connection('perfilacesso').where('id', id).update({                
                perfil,
                descricao, 
                ativo,
                dataUltModif,
                usuarioId
            });           

            return response.status(204).send();
        },
    };