const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const acessopagina = await connection('acessopagina')
        .join( 'perfilacesso' , 'perfilacesso.id' , 'acessopagina.perfilacessoId')
        .join( 'modulo' , 'modulo.id' , '=' , 'acessopagina.moduloId')
        .join( 'pagina' , 'pagina.id' , '=' , 'acessopagina.paginaId')
        .join ( 'usuario' , 'usuario.id' , '=' , 'acessopagina.usuarioId')
        .limit(20) //limita o retorno dos registros
        .offset((page - 1) * 20) //paginacao
        .select([
            'acessopagina.*',
            'perfilacesso.perfil',
            'modulo.nomemodulo',
            'pagina.nomepagina',
            'usuario.nome'
        ]);

    
        return response.json(acessopagina);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const acessopagina = await connection('acessopagina')
            .where('acessopagina.id', id)
            .join( 'perfilacesso' , 'perfilacesso.id' , 'acessopagina.perfilacessoId')
            .join( 'modulo' , 'modulo.id' , '=' , 'acessopagina.moduloId')
            .join( 'pagina' , 'pagina.id' , '=' , 'acessopagina.paginaId')
            .join ( 'usuario' , 'usuario.id' , '=' , 'acessopagina.usuarioId')
            .select([
                'acessopagina.*',
                'perfilacesso.perfil',
                'modulo.nomemodulo',
                'pagina.nomepagina',
                'usuario.nome'
            ])
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
        async getCount (request,response) {        

            const [count] = await connection('acessopagina').count()
            const { page = 1 } = request.query;
            return response.json(count['count(*)']);        
        }
    };