const connection = require('../../database/connection');
const getDate = require('../../utils/getDate');
module.exports = {
    async getAll (request, response) {
        const atividades = await connection('atividades')
        .leftJoin( 'clientes', 'clientes.id' , '=' , 'atividades.clienteId' )
        .leftJoin( 'contatos', 'contatos.id' , '=' , 'atividades.contatoId' )
        .join( 'usuario', 'usuario.id' , '=' , 'atividades.responsavelId' )
        .join( 'tiposatividade', 'tiposatividade.id' , '=' , 'atividades.tipoatividadeId' )
        .select([
            'atividades.*',
            'clientes.nomecliente',
            'contatos.nomecontato',
            'usuario.nome as nomeresponsavel',
            'tiposatividade.tipoatividade'
        ]);
    
        return response.json(atividades);
    },

    async getById (request, response) {
        const  { id }  = request.params;

        const atividades = await connection('atividades')
            .where('atividades.id', id)
            .leftJoin( 'clientes', 'clientes.id' , '=' , 'atividades.clienteId' )
            .leftJoin( 'contatos', 'contatos.id' , '=' , 'atividades.contatoId' )
            .join( 'usuario', 'usuario.id' , '=' , 'atividades.responsavelId' )
            .join( 'tiposatividade', 'tiposatividade.id' , '=' , 'atividades.tipoatividadeId' )
            .select([
                'atividades.*',
                'clientes.nomecliente',
                'contatos.nomecontato',
                'usuario.nome as nomeresponsavel',
                'tiposatividade.tipoatividade'
            ])
            .first();
    
        return response.json(atividades);
    },

    async create(request, response) {
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();

        const { 
                responsavelId, atividade, descricao, clienteId, contatoId, tipoatividadeId, dataatividade,
                datainicio, datafim, temponotificacao, exibenotificacao, anexoId,  cancelado } = request.body;
        
        

        const [id] = await connection('atividades').insert({
                responsavelId,
                atividade,
                descricao,
                clienteId,
                contatoId,
                tipoatividadeId,
                dataatividade,
                datainicio,
                datafim,
                temponotificacao,
                exibenotificacao,
                anexoId,
                cancelado,
                dataUltModif,
                usuarioId
        })

        return response.json({ id });
    },
    
    async update (request, response) {
        const   { id }   = request.params;
        const  usuarioId  = request.headers.authorization;
        const  dataUltModif = getDate();
        const { 
            responsavelId, atividade, descricao, clienteId, contatoId, tipoatividadeId, dataatividade,
            datainicio, datafim, temponotificacao, exibenotificacao, anexoId,  cancelado } = request.body;


        console.log(`usuarioId${usuarioId}`);

        await connection('atividades').where('id', id).update({
            responsavelId,
            atividade,
            descricao,
            clienteId,
            contatoId,
            tipoatividadeId,
            dataatividade,
            datainicio,
            datafim,
            temponotificacao,
            exibenotificacao,
            anexoId,
            cancelado,
            dataUltModif,
            usuarioId
        });           

        return response.status(204).send();
    },
    async getCount (request,response) {        

        const [count] = await connection('atividades').count()
        const { page = 1 } = request.query;
        return response.json(count['count(*)']);        
    }
};