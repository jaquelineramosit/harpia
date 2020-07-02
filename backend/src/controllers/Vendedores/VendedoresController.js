const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    
    async getAll (request, response) {
        
        const perfilacessousuario = await connection('perfilacessousuario')
            .where('perfilacesso.perfil', 'Vendedor')
            .join( 'usuario as user' , 'user.id' , '=' , 'perfilacessousuario.usuarioId')
            .join( 'perfilacesso' , 'perfilacesso.id' , '=' , 'perfilacessousuario.perfilacessoId')
            .leftJoin( 'usuario as userModif' , 'userModif.id' , '=' , 'perfilacessousuario.usuariomodifid')
            .select([
                'perfilacessousuario.*',                
                'user.nome as nomevendedor',
                'user.sobrenome as sobrenomevendedor',
                'perfilacesso.perfil',
                'userModif.nome as nomeusuarioModif'            
            ]);

        console.log(perfilacessousuario);
        return response.json(perfilacessousuario);
    }
};
