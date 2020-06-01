const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const contatos = await connection('contatos')
        .join( 'tiposcontato' , 'tiposcontato.id' , '=' , 'contatos.tipocontatoId')
        .join( 'cargos' , 'cargos.id' , '=' , 'contatos.cargoId')
        .join( 'departamentos' , 'departamentos.id' , '=' , 'contatos.departamentoId')
        .select([
            'contatos.*',
            'tiposcontato.tipocontato',
            'cargos.nomecargo',
            'departamentos.departamento'
        ]);
    
        return response.json(contatos);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const contatos = await connection('contatos')
            .where('contatos.id', id)
            .join( 'tiposcontato' , 'tiposcontato.id' , '=' , 'contatos.tipocontatoId')
            .join( 'cargos' , 'cargos.id' , '=' , 'contatos.cargoId')
            .join( 'departamentos' , 'departamentos.id' , '=' , 'contatos.departamentoId')
            .select([
                'contatos.*',
                'tiposcontato.tipocontato',
                'cargos.nomecargo',
                'departamentos.departamento'
            ])
            .first();
    
        return response.json(contatos);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { proprietarioId, nomecontato,
            tipocontatoId, cargoId, departamentoId, usuarioautorizador, 
            telefone, celular, datanasc, email, cep, logradouro, 
            complemento, bairro, cidade, uf, ativo } = request.body;
        
        const [id] = await connection('contatos').insert({
            proprietarioId, 
            nomecontato,
            tipocontatoId, 
            cargoId, 
            departamentoId, 
            usuarioautorizador, 
            telefone,
            celular, 
            datanasc, 
            email, 
            cep, 
            logradouro, 
            complemento, 
            bairro,   
            cidade, 
            uf,         
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
        
        const { proprietarioId, nomecontato,
            tipocontatoId, cargoId, departamentoId, usuarioautorizador, 
            telefone, celular, datanasc, email, cep, logradouro, 
            complemento, bairro, cidade, uf, ativo } = request.body;

        await connection('contatos').where('id', id).update({
            proprietarioId, 
            nomecontato,
            tipocontatoId, 
            cargoId, 
            departamentoId, 
            usuarioautorizador, 
            telefone,
            celular, 
            datanasc, 
            email, 
            cep, 
            logradouro, 
            complemento, 
            bairro,   
            cidade, 
            uf,         
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};