import React from 'react';

// Dashboards
const Dashboard = React.lazy(() => import('./pages/Dashboards/Dashboard/Dashboard'));
const Dashboardv2 = React.lazy(() => import('./pages/Dashboards/Dashboardv2/index'));
const Dashboardv3 = React.lazy(() => import('./pages/Dashboards/Dashboardv3/index'));

// Acessos
const Logon = React.lazy(() => import('./pages/Acessos/Logon'));
const Modulo = React.lazy(() => import('./pages/Acessos/Modulo'));
const Pagina = React.lazy(() => import('./pages/Acessos/Pagina'));
const Password = React.lazy(() => import('./pages/Acessos/Password'));
const PerfilAcesso = React.lazy(() => import('./pages/Acessos/PerfilAcesso'));
const PermissaoAcesso = React.lazy(() => import('./pages/Acessos/PermissaoAcesso'));
const Register = React.lazy(() => import('./pages/Acessos/Register'));
const Usuario = React.lazy(() => import('./pages/Acessos/Usuario'));

// Atividades
const Anotacoes = React.lazy(() => import('./pages/Atividades/Anotacoes'));
const Atividades = React.lazy(() => import('./pages/Atividades/Atividades'));
const Oportunidades = React.lazy(() => import('./pages/Atividades/Oportunidades'));

// Configurações
const Cargos = React.lazy(() => import('./pages/Configuracoes/Cargos'));
const Clientes = React.lazy(() => import('./pages/Configuracoes/Clientes'));
const Contatos = React.lazy(() => import('./pages/Configuracoes/Contatos'));
const Departamentos = React.lazy(() => import('./pages/Configuracoes/Departamentos'));
const Distribuidores = React.lazy(() => import('./pages/Configuracoes/Distribuidores'));
const ExpectativasFechamento = React.lazy(() => import('./pages/Configuracoes/ExpectativasFechamento'));
const FasesPipe = React.lazy(() => import('./pages/Configuracoes/FasesPipe'));
const Marcas = React.lazy(() => import('./pages/Configuracoes/Marcas'));
const Metas = React.lazy(() => import('./pages/Configuracoes/Metas'));
const MetasVendedores = React.lazy(() => import('./pages/Configuracoes/MetasVendedores'));
const MotivosPerda = React.lazy(() => import('./pages/Configuracoes/MotivosPerda'));
const Paises = React.lazy(() => import('./pages/Configuracoes/Paises'));
const Pipes = React.lazy(() => import('./pages/Configuracoes/Pipes'))
const Produtos = React.lazy(() => import('./pages/Configuracoes/Produtos'));
const SegmentosMercado = React.lazy(() => import('./pages/Configuracoes/SegmentosMercado'));
const TiposAtividade = React.lazy(() => import('./pages/Configuracoes/TiposAtividade'));
const TiposContato = React.lazy(() => import('./pages/Configuracoes/TiposContato'));


  //Tabelas

//Configuração
const Listcargos = React.lazy(() => import('./pages/Listas/Configuracoes/Listcargos'));
const Listcontatos = React.lazy(() => import('./pages/Listas/Configuracoes/Listcontatos'));
const Listtipocontatos = React.lazy(() => import('./pages/Listas/Configuracoes/Listtipocontatos'));
const Listdepartamentos = React.lazy(() => import('./pages/Listas/Configuracoes/Listdepartamentos'));
const Listmetas = React.lazy(() => import('./pages/Listas/Configuracoes/Listmetas'));
const Listmetasvendedores = React.lazy(() => import('./pages/Listas/Configuracoes/Listmetasvendedores'));
//const Listpipes = React.lazy(() => import('./pages/Listas/Configuracoes/Listpipes'));
const Listfasespipes = React.lazy(() => import('./pages/Listas/Configuracoes/Listfasespipes'));
const Listprodutos = React.lazy(() => import('./pages/Listas/Configuracoes/Listprodutos'));
const Listdistribuidores = React.lazy(() => import('./pages/Listas/Configuracoes/Listdistribuidores'));
const Listmarcas = React.lazy(() => import('./pages/Listas/Configuracoes/Listmarcas'));
const Listclientes = React.lazy(() => import('./pages/Listas/Configuracoes/Listclientes'));
const Listpaises = React.lazy(() => import('./pages/Listas/Configuracoes/Listpaises'));
const Listsegmentosmercado = React.lazy(() => import('./pages/Listas/Configuracoes/Listsegmentosmercado'));
const ListtiposAtividade = React.lazy(() => import('./pages/Listas/Configuracoes/ListtiposAtividade'));
const Listexpectativasfechamento = React.lazy(() => import('./pages/Listas/Configuracoes/Listexpectativasfechamento'));
const Listmotivosperda = React.lazy(() => import('./pages/Listas/Configuracoes/Listmotivosperda'));

//Atividades
const Listanotacoes = React.lazy(() => import('./pages/Listas/Atividades/Listanotacoes'));
const Listoportunidades = React.lazy(() => import('./pages/Listas/Atividades/Listoportunidades'));
const Listaatividades = React.lazy(() => import('./pages/Listas/Atividades/Listaatividades'));

//Acessos
const ListaModulos = React.lazy(() => import('./pages/Listas/Acessos/ListaModulos'));
const Listapaginas = React.lazy(() => import('./pages/Listas/Acessos/Listapaginas'));
const Listausuarios = React.lazy(() => import('./pages/Listas/Acessos/Listausuarios'));
const Listaperfisacesso = React.lazy(() => import('./pages/Listas/Acessos/Listaperfisacesso'));
const Listapermissaoacesso = React.lazy(() => import('./pages/Listas/Acessos/Listapermissaoacesso'));

//Icons
const ListaIconsSimpleLine = React.lazy(() => import('./pages/Icons/IconsSimpleLine'));
const ListaIconsFontAwesome = React.lazy(() => import('./pages/Icons/IconsFontAwesome'));
//Relatórios
const relcontatonumeroportunidades = React.lazy(() => import('./pages/Relatórios/Contato x Numero Oportunidades'));
const relcontatovalorganhoperdido = React.lazy(() => import('./pages/Relatórios/Contato x Valor Ganho e Valor Perdido'));
const relcontatotempoportunidade = React.lazy(() => import('./pages/Relatórios/Contato X Temperatura de Oportunidade'));

const TesteValidaForm = React.lazy(() => import('./pages/TesteValidaForm'));

const routes = [

  // Dashboards
  // { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/', exact: true, name: 'Home'},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboardv2', name: 'Dashboardv2', component: Dashboardv2 },
  { path: '/dashboardv3', name: 'Dashboardv3', component: Dashboardv3 },

  // Acessos
  { path: '/logon', name: 'Logon', component: Logon },
  { path: '/modulos', exact:true, name: 'Módulos', component: Modulo },
  { path: '/modulos/:id', name: 'Módulos', component: Modulo },
  { path: '/paginas', exact:true, name: 'Páginas', component: Pagina },
  { path: '/paginas/:id', name: 'Páginas', component: Pagina },
  { path: '/perfis-acesso', name: 'Perfis de Acesso', component: PerfilAcesso },
  { path: '/permissao-acesso', name: 'Permissão deAcesso', component: PermissaoAcesso },
  { path: '/register', name: 'Register', component: Register },
  { path: '/usuarios', exact:true, name: 'Usuários', component: Usuario },
  { path: '/usuarios/:id', name: 'Usuários', component: Usuario },

  //Atividades
  { path: '/anotacoes', name: 'Anotações', component: Anotacoes },
  { path: '/atividades', name: 'Atividades', component: Atividades },
  { path: '/oportunidades', name: 'Oportunidades', component: Oportunidades },


  //Configuração
  { path: '/cargos', exact:true, name: 'Cargos', component: Cargos },
  { path: '/cargos/:id', name: 'Cargos', component: Cargos },
  { path: '/clientes', name: 'Clientes', component: Clientes },
  { path: '/contatos', name: 'Contatos', component: Contatos },
  { path: '/departamentos', exact:true, name: 'Departamentos', component: Departamentos },
  { path: '/departamentos/:id', name: 'Departamentos', component: Departamentos },
  { path: '/distribuidores', name: 'Distribuidores', component: Distribuidores },
  { path: '/expectativas-fechamento', name: 'Expectativas de Fechamento', component: ExpectativasFechamento },
  { path: '/fases-pipe', name: 'Fases do Pipe', component: FasesPipe },
  { path: '/marcas/:id', name: 'Marcas', component: Marcas },
  { path: '/marcas', exact:true, name: 'Marcas', component: Marcas },
  { path: '/metas/:id', name: 'Metas', component: Metas },
  { path: '/metas', exact:true, name: 'Metas', component: Metas },
  { path: '/metas-vendedores/:id', name: 'Metas de Vendedores', component: MetasVendedores },
  { path: '/metas-vendedores', exact:true, name: 'Metas de Vendedores', component: MetasVendedores },
  { path: '/motivos-perda/:id', name: 'Motivos de Perda', component: MotivosPerda },
  { path: '/motivos-perda', exact:true, name: 'Motivos de Perda', component: MotivosPerda },
  { path: '/paises', name: 'Países', component: Paises },
  { path: '/pipes', name: 'Pipes', component: Pipes },
  { path: '/produtos', name: 'Produtos', component: Produtos },
  { path: '/segmentos-mercado/:id', name: 'Segmentos de Mercado', component: SegmentosMercado },
  { path: '/segmentos-mercado', exact:true, name: 'Segmentos de Mercado', component: SegmentosMercado },
  { path: '/tipos-atividade/:id', name: 'Tipos de Atividade', component: TiposAtividade },
  { path: '/tipos-atividade', exact:true, name: 'Tipos de Atividade', component: TiposAtividade },
  { path: '/tipos-contato/:id', name: 'Tipos de Contato', component: TiposContato },
  { path: '/tipos-contato', exact:true, name: 'Tipos de Contato', component: TiposContato },

  //Tabelas

  //Configuração
  { path: '/List-cargos', name: 'Lista de Cargos', component: Listcargos },
  { path: '/List-contatos', name: 'Lista de Contatos', component: Listcontatos },
  { path: '/List-tipocontato', name: 'Lista de Tipo de Contatos', component: Listtipocontatos },
  { path: '/List-departamentos', name: 'Lista de Departamentos', component: Listdepartamentos },
  { path: '/List-metas', name: 'Lista de Metas', component: Listmetas },
  { path: '/List-metasvendedores', name: 'Lista de Metas de Vendedores', component: Listmetasvendedores },
  { path: '/List-metasvendedores', name: 'Lista de Metas de Vendedores', component: Listmetasvendedores },
  { path: '/List-fasespipes', name: 'Lista de Fases do Pipes', component: Listfasespipes},
  { path: '/List-produtos', name: 'Lista de Fases de Produtos', component: Listprodutos},
  { path: '/List-distribuidores', name: 'Lista de Distribuidores', component: Listdistribuidores},
  { path: '/List-marcas', name: 'Lista de Marcas', component: Listmarcas},
  { path: '/List-clientes', name: 'Lista de Clientes', component: Listclientes},
  { path: '/List-paises', name: 'Lista de Países', component: Listpaises},
  { path: '/List-segmentosmercado', name: 'Lista de Segmentos de Mercado', component: Listsegmentosmercado},
  { path: '/List-tiposatividade', name: 'Lista de Tipos de Atividade', component: ListtiposAtividade },
  { path: '/List-expectativasfechamento', name: 'Lista de Expectativas de fechamento', component: Listexpectativasfechamento },
  { path: '/List-motivosperda', name: 'Lista de Motivos de Perda', component: Listmotivosperda },

  //Atividades
  { path: '/List-anotacoes', name: 'Lista de Anotações', component: Listanotacoes },
  { path: '/List-oportunidades', name: 'Lista de Oportunidades', component: Listoportunidades },
  { path: '/List-atividades', name: 'Lista de Atividades', component: Listaatividades },

  //Acessos
  { path: '/List-modulos', name: 'Lista de Módulos', component: ListaModulos },
  { path: '/List-paginas', name: 'Lista de Páginas', component: Listapaginas },
  { path: '/List-usuarios', name: 'Lista de Usuários', component: Listausuarios },
  { path: '/List-perfisacesso', name: 'Lista de Perfil de Acesso', component: Listaperfisacesso },
  { path: '/List-permissaoacesso', name: 'Lista de Permissão de Acesso', component: Listapermissaoacesso },

  //Icons
  { path: '/list-icons-fontAwesome', name: 'Lista Font Awesome Icons', component: ListaIconsFontAwesome },
  { path: '/list-icons-simpleLine', name: 'Lista Simple Line', component: ListaIconsSimpleLine },
  //Tabelas
  { path: '/rel-contatoxnumeroportunidades', name: ' Relatório de Contato X Número de oportunidades', component: relcontatonumeroportunidades },
  { path: '/rel-contatoxvalorganhoperdido', name: ' Relatório de Contato X Valor Ganho e Valor Perdido', component: relcontatovalorganhoperdido},
  { path: '/rel-contatoxtempoportunidade', name: ' Relatório de Contato X Temperatura de Oportunidade', component: relcontatotempoportunidade},

  { path: '/teste-validaForm', name: 'TesteValidaForm', component: TesteValidaForm},

];

export default routes;
