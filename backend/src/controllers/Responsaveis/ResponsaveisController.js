const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {

    async getAll (request, response) {
        
        const usuario = await connection('usuario')                                   
            .leftJoin( 'usuario as userModif' , 'userModif.usuarioId' , '=' , 'usuario.usuarioId')
            .select([
                'usuario.*',                
                'userModif.nome as nomeusuarioModif',
                'userModif.sobrenome as sobrenomeusuarioModif'                           
            ]);

        return response.json(usuario);
    },

    async getAllPorPerfil (request, response) {
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
    }
};
