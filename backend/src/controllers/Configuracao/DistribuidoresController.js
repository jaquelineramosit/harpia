const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const { page = 1 } = request.query;
        const distribuidores = await connection('distribuidores')
        .select('*');
    
        return response.json(distribuidores);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const distribuidores = await connection('distribuidores')
            .where('id', id)
            .select()
            .first();
    
        return response.json(distribuidores);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomedistribuidor, cnpj, razaosocial, contato, telefone, celular,
            site, email, ativo } = request.body;

        console.log(request.headers.authorization);
        
        // const [id] = await connection('distribuidores').insert({
        //     nomedistribuidor, 
        //     cnpj, 
        //     razaosocial, 
        //     contato, 
        //     telefone, 
        //     celular,
        //     site, 
        //     email,                
        //     ativo,
        //     dataUltModif,
        //     usuarioId
        // })

        // return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();
        
        const { nomedistribuidor, cnpj, razaosocial, contato, telefone, celular,
            site, email, ativo } = request.body;

        await connection('distribuidores').where('id', id).update({
            nomedistribuidor, 
            cnpj, 
            razaosocial, 
            contato, 
            telefone, 
            celular,
            site, 
            email,                
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('distribuidores').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};