const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {  
        const metasvendedores = await connection('metasvendedores')
        .join( 'metas' , 'metas.id' , '=' , 'metasvendedores.metaId')
        .join( 'usuario' , 'usuario.id' , '=' , 'metasvendedores.vendedorId')
        .select([
            'metasvendedores.*',
            'metas.nomemeta',
            'usuario.nome as nomevendedor',
            'usuario.sobrenome as sobrenomevendedor',
        ]);
    
        return response.json(metasvendedores);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const metasvendedores = await connection('metasvendedores')
            .where('metasvendedores.id', id)
            .join( 'metas' , 'metas.id' , '=' , 'metasvendedores.metaId')
            .join( 'usuario' , 'usuario.id' , '=' , 'metasvendedores.vendedorId')
            .select([
                'metasvendedores.*',
                'metas.nomemeta',
                'usuario.nome as nomevendedor',
                'usuario.sobrenome as sobrenomevendedor',
            ])
            .first();
    
        return response.json(metasvendedores);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { vendedorId, metaId, observacao, ativo } = request.body;
        
        const [id] = await connection('metasvendedores').insert({
            vendedorId,
            metaId,
            observacao,                    
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
        
        const { vendedorId, metaId, observacao, ativo } = request.body;

        await connection('metasvendedores').where('id', id).update({
            vendedorId,
            metaId,
            observacao,                          
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('metasvendedores').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};