const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const perfilacessousuario = await connection('perfilacessousuario')
        .join( 'usuario as user' , 'user.id' , '=' , 'perfilacessousuario.usuarioId')
        .join( 'perfilacesso' , 'perfilacesso.id' , '=' , 'perfilacessousuario.perfilacessoId')
        .leftJoin( 'usuario as userModif' , 'userModif.id' , '=' , 'perfilacessousuario.usuariomodifid')
        .select([
            'perfilacessousuario.*',
            'user.nome as nomeusuario',
            'perfilacesso.perfil',
            'userModif.nome as nomeusuarioModif'            
        ]);
    
        return response.json(perfilacessousuario);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const perfilacessousuario = await connection('perfilacessousuario')
            .where('perfilacessousuario.id', id)
            .join( 'usuario as user' , 'user.id' , '=' , 'perfilacessousuario.usuarioId')
            .join( 'perfilacesso' , 'perfilacesso.id' , '=' , 'perfilacessousuario.perfilacessoId')
            .leftJoin( 'usuario as userModif' , 'userModif.id' , '=' , 'perfilacessousuario.usuariomodifid')
            .select([
                'perfilacessousuario.*',
                'user.nome as nomeusuario',
                'perfilacesso.perfil',
                'userModif.nome as nomeusuarioModif'            
            ])
            .first();
    
        return response.json(perfilacessousuario);
    },

    async getUsuariosPerfil (request, response) {
        const  { perfil }  = request.params;

        const perfilacessousuario = await connection('perfilacessousuario')
            .where('perfilacesso.perfil', perfil)
            .join( 'usuario as user' , 'user.id' , '=' , 'perfilacessousuario.usuarioId')
            .join( 'perfilacesso' , 'perfilacesso.id' , '=' , 'perfilacessousuario.perfilacessoId')
            .leftJoin( 'usuario as userModif' , 'userModif.id' , '=' , 'perfilacessousuario.usuariomodifid')
            .select([
                'perfilacessousuario.*',                
                'user.nome as nomeusuario',
                'user.sobrenome as sobrenomeusuario',
                'perfilacesso.perfil',
                'userModif.nome as nomeusuarioModif'            
            ]);
    
        return response.json(perfilacessousuario);
    },

    async create(request, response) {
        const  usuariomodifid  = request.headers.authorization;        
        const  dataUltModif = getDate();

        const {perfilacessoId, usuarioId, ativo } = request.body;

        const [id] = await connection('perfilacessousuario').insert({                
                perfilacessoId,
                usuarioId, 
                ativo,
                dataUltModif,
                usuariomodifid
        })

        return response.json({ id });
    },
    
        async update (request, response) {
            const   { id }   = request.params;
            const  usuariomodifid  = request.headers.authorization;         
            const  dataUltModif = getDate();

            const {perfilacessoId, usuarioId, ativo } = request.body;
    
            await connection('perfilacessousuario').where('id', id).update({                
                perfilacessoId,
                usuarioId, 
                ativo,
                dataUltModif,
                usuariomodifid
            });           

            return response.status(204).send();
        },
        async getCount (request,response) {        

            const [count] = await connection('perfilacessousuario').count()
            const { page = 1 } = request.query;
            return response.json(count['count(*)']);        
        }
    };