const express = require('express');

// Acessos
const LogonController = require('./controllers/Acessos/LogonController');
const UsuarioController = require('./controllers/Acessos/UsuarioController');
const ModuloController = require('./controllers/Acessos/ModuloController');
const PaginaController = require('./controllers/Acessos/PaginaController');
const PerfilAcessoController = require('./controllers/Acessos/PerfilAcessoController');
const PermissaoAcessoController = require('./controllers/Acessos/PermissaoAcessoController');
const RegisterController = require('./controllers/Acessos/RegisterController');

//Atividades
const AnotacoesController = require('./controllers/Atividades/AnotacoesController');
const AtividadesController = require('./controllers/Atividades/AtividadesController');
const OportunidadesController = require('./controllers/Atividades/OportunidadesController');

//Configurações
const CargosController = require('./controllers/Configuracao/CargosController');
const ClientesController = require('./controllers/Configuracao/ClientesController');
const ContatosController = require('./controllers/Configuracao/ContatosController');
const DepartamentosController = require('./controllers/Configuracao/DepartamentosController');
const DistribuidoresController = require('./controllers/Configuracao/DistribuidoresController');
const ExpecFechaController = require('./controllers/Configuracao/ExpecFechaController');
const FasesPipeController = require('./controllers/Configuracao/FasesPipeController');
const MarcasController = require('./controllers/Configuracao/MarcasController');
const MetasController = require('./controllers/Configuracao/MetasController');
const MetasVendedoresController = require('./controllers/Configuracao/MetasVendedoresController');
const MotivosPerdaController = require('./controllers/Configuracao/MotivosPerdaController');
const PaisesController = require('./controllers/Configuracao/PaisesController');
const PipesController = require('./controllers/Configuracao/PipesController');
const ProdutosController = require('./controllers/Configuracao/ProdutosController');
const SegMercadoController = require('./controllers/Configuracao/SegMercadoController');
const TiposAtividadeController = require('./controllers/Configuracao/TiposAtividadeController');
const TiposContatoController = require('./controllers/Configuracao/TiposContatoController');

//Dashboards
const Dashboardv1Controller = require('./controllers/Dashboards/Dashboardv1Controller');
const Dashboardv2Controller = require('./controllers/Dashboards/Dashboardv2Controller');
const Dashboardv3Controller = require('./controllers/Dashboards/Dashboardv3Controller');

const routes = express.Router();

// Acessos
routes.post('/logon', LogonController.create);

routes.get('/usuarios', UsuarioController.getAll);
routes.get('/usuarios/:id', UsuarioController.getById);
routes.post('/usuarios', UsuarioController.create);
routes.put('/usuarios/:id', UsuarioController.update);

routes.get('/modulos', ModuloController.getAll);
routes.get('/modulos/:id', ModuloController.getById);
routes.post('/modulos', ModuloController.create);
routes.put('/modulos/:id', ModuloController.update);

routes.get('/paginas', PaginaController.getAll);
routes.get('/paginas/:id', PaginaController.getById);
routes.post('/paginas', PaginaController.create);
routes.put('/paginas/:id', PaginaController.update);

routes.get('/perfis-acesso', PerfilAcessoController.getAll);
routes.get('/perfis-acesso/:id', PerfilAcessoController.getById);
routes.post('/perfis-acesso', PerfilAcessoController.create);
routes.put('/perfis-acesso/:id', PerfilAcessoController.update);

routes.get('/permissao-acesso', PermissaoAcessoController.getAll);
routes.get('/permissao-acesso/:id', PermissaoAcessoController.getById);
routes.post('/permissao-acesso', PermissaoAcessoController.create);
routes.put('/permissao-acesso/:id', PermissaoAcessoController.update);

routes.get('/register', RegisterController.getAll);
routes.get('/register/:id', RegisterController.getById);
routes.post('/register', RegisterController.create);
routes.put('/register/:id', RegisterController.update);

// Atividades
routes.get('/anotacoes', AnotacoesController.getAll);
routes.get('/anotacoes/:id', AnotacoesController.getById);
routes.post('/anotacoes', AnotacoesController.create);
routes.put('/anotacoes/:id', AnotacoesController.update);

routes.get('/atividades', AtividadesController.getAll);
routes.get('/atividades/:id', AtividadesController.getById);
routes.post('/atividades', AtividadesController.create);
routes.put('/atividades/:id', AtividadesController.update);

routes.get('/oportunidades', OportunidadesController.getAll);
routes.get('/oportunidades/:id', OportunidadesController.getById);
routes.post('/oportunidades', OportunidadesController.create);
routes.put('/oportunidades/:id', OportunidadesController.update);

// Configuração
routes.get('/cargos', CargosController.getAll);
routes.get('/cargos/:id', CargosController.getById);
routes.post('/cargos', CargosController.create);
routes.put('/cargos/:id', CargosController.update);

routes.get('/clientes', ClientesController.getAll);
routes.get('/clientes/:id', ClientesController.getById);
routes.post('/clientes', ClientesController.create);
routes.put('/clientes/:id', ClientesController.update);

routes.get('/contatos', ContatosController.getAll);
routes.get('/contatos/:id', ContatosController.getById);
routes.post('/contatos', ContatosController.create);
routes.put('/contatos/:id', ContatosController.update);

routes.get('/departamentos', DepartamentosController.getAll);
routes.get('/departamentos/:id', DepartamentosController.getById);
routes.post('/departamentos', DepartamentosController.create);
routes.put('/departamentos/:id', DepartamentosController.update);

routes.get('/distribuidores', DistribuidoresController.getAll);
routes.get('/distribuidores/:id', DistribuidoresController.getById);
routes.post('/distribuidores', DistribuidoresController.create);
routes.put('/distribuidores/:id', DistribuidoresController.update);

routes.get('/expectativas-fechamento', ExpecFechaController.getAll);
routes.get('/expectativas-fechamento/:id', ExpecFechaController.getById);
routes.post('/expectativas-fechamento', ExpecFechaController.create);
routes.put('/expectativas-fechamento/:id', ExpecFechaController.update);

routes.get('/fases-pipe', FasesPipeController.getAll);
routes.get('/fases-pipe/:id', FasesPipeController.getById);
routes.post('/fases-pipe', FasesPipeController.create);
routes.put('/fases-pipe/:id', FasesPipeController.update);

routes.get('/marcas', MarcasController.getAll);
routes.get('/marcas/:id', MarcasController.getById);
routes.post('/marcas', MarcasController.create);
routes.put('/marcas/:id', MarcasController.update);

routes.get('/metas', MetasController.getAll);
routes.get('/metas/:id', MetasController.getById);
routes.post('/metas', MetasController.create);
routes.put('/metas/:id', MetasController.update);

routes.get('/metas-vendedores', MetasVendedoresController.getAll);
routes.get('/metas-vendedores/:id', MetasVendedoresController.getById);
routes.post('/metas-vendedores', MetasVendedoresController.create);
routes.put('/metas-vendedores/:id', MetasVendedoresController.update);

routes.get('/motivos-perda', MotivosPerdaController.getAll);
routes.get('/motivos-perda/:id', MotivosPerdaController.getById);
routes.post('/motivos-perda', MotivosPerdaController.create);
routes.put('/motivos-perda/:id', MotivosPerdaController.update);

routes.get('/paises', PaisesController.getAll);
routes.get('/paises/:id', PaisesController.getById);
routes.post('/paises', PaisesController.create);
routes.put('/paises/:id', PaisesController.update);

routes.get('/pipes', PipesController.getAll);
routes.get('/pipes/:id', PipesController.getById);
routes.post('/pipes', PipesController.create);
routes.put('/pipes/:id', PipesController.update);

routes.get('/produtos', ProdutosController.getAll);
routes.get('/produtos/:id', ProdutosController.getById);
routes.post('/produtos', ProdutosController.create);
routes.put('/produtos/:id', ProdutosController.update);

routes.get('/segmentos-mercado', SegMercadoController.getAll);
routes.get('/segmentos-mercado/:id', SegMercadoController.getById);
routes.post('/segmentos-mercado', SegMercadoController.create);
routes.put('/segmentos-mercado/:id', SegMercadoController.update);

routes.get('/tipos-atividade', TiposAtividadeController.getAll);
routes.get('/tipos-atividade/:id', TiposAtividadeController.getById);
routes.post('/tipos-atividade', TiposAtividadeController.create);
routes.put('/tipos-atividade/:id', TiposAtividadeController.update);

routes.get('/tipos-contato', TiposContatoController.getAll);
routes.get('/tipos-contato/:id', TiposContatoController.getById);
routes.post('/tipos-contato', TiposContatoController.create);
routes.put('/tipos-contato/:id', TiposContatoController.update);

//Dashboards
routes.get('/dashboardv1', Dashboardv1Controller.getAll);
routes.get('/dashboardv1/:id', Dashboardv1Controller.getById);
routes.post('/dashboardv1', Dashboardv1Controller.create);
routes.put('/dashboardv1/:id', Dashboardv1Controller.update);

routes.get('/dashboardv2', Dashboardv2Controller.getAll);
routes.get('/dashboardv2/:id', Dashboardv2Controller.getById);
routes.post('/dashboardv2', Dashboardv2Controller.create);
routes.put('/dashboardv2/:id', Dashboardv2Controller.update);

routes.get('/dashboardv3', Dashboardv3Controller.getAll);
routes.get('/dashboardv3/:id', Dashboardv3Controller.getById);
routes.post('/dashboardv3', Dashboardv3Controller.create);
routes.put('/dashboardv3/:id', Dashboardv3Controller.update);


module.exports = routes;