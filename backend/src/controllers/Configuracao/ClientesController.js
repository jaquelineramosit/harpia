const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const clientes = await connection('clientes').select('*');
    
        return response.json(clientes);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const clientes = await connection('clientes')
            .where('id', id)
            .select()
            .first();
    
        return response.json(clientes);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { nomecliente, razaosocial, tipopessoa, cnpj, cpf, contatoId,
            site, email, telefone, cep, logradouro, numero,
            complemento, bairro, cidade, uf, paisId,
            segmentomercadoId, ativo } = request.body;
        
        const [id] = await connection('clientes').insert({
            nomecliente,
            razaosocial,
            tipopessoa,
            cnpj,
            cpf,
            contatoId,
            site,
            email,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            paisId,
            segmentomercadoId,
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
        
        const { nomecliente, razaosocial, tipopessoa, cnpj, cpf, contatoId,
            site, email, telefone, cep, logradouro, numero,
            complemento, bairro, cidade, uf, paisId,
            segmentomercadoId, ativo } = request.body;

        await connection('clientes').where('id', id).update({
            nomecliente,
            razaosocial,
            tipopessoa,
            cnpj,
            cpf,
            contatoId,
            site,
            email,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            paisId,
            segmentomercadoId,
            ativo,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
};