import React from 'react';

// Dashboards
const Dashboard = React.lazy(() => import('./pages/Dashboards/Dashboard/Dashboard'));
const Dashboardv2 = React.lazy(() => import('./pages/Dashboards/Dashboardv2'));
const Dashboardv3 = React.lazy(() => import('./pages/Dashboards/Dashboardv3'));

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
const TemperaturaFechamento = React.lazy(() => import('./pages/Configuracoes/TemperaturaFechamento'));
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
const ListaCargos = React.lazy(() => import('./pages/Listas/Configuracoes/ListaCargos'));
const ListaContatos = React.lazy(() => import('./pages/Listas/Configuracoes/ListaContatos'));
const ListaTipoContatos = React.lazy(() => import('./pages/Listas/Configuracoes/ListaTipoContatos'));
const ListaDepartamentos = React.lazy(() => import('./pages/Listas/Configuracoes/ListaDepartamentos'));
const ListaMetas = React.lazy(() => import('./pages/Listas/Configuracoes/ListaMetas'));
const ListaMetasVendedores = React.lazy(() => import('./pages/Listas/Configuracoes/ListaMetasVendedores'));
//const Listapipes = React.lazy(() => import('./pages/Listas/Configuracoes/Listpipes'));
const ListaFasesPipes = React.lazy(() => import('./pages/Listas/Configuracoes/ListaFasesPipes'));
const ListaProdutos = React.lazy(() => import('./pages/Listas/Configuracoes/ListaProdutos'));
const ListaDistribuidores = React.lazy(() => import('./pages/Listas/Configuracoes/ListaDistribuidores'));
const ListaMarcas = React.lazy(() => import('./pages/Listas/Configuracoes/ListaMarcas'));
const ListaClientes = React.lazy(() => import('./pages/Listas/Configuracoes/ListaClientes'));
const ListaPaises = React.lazy(() => import('./pages/Listas/Configuracoes/ListaPaises'));
const ListaSegmentosMercado = React.lazy(() => import('./pages/Listas/Configuracoes/ListaSegmentosMercado'));
const ListaTiposAtividade = React.lazy(() => import('./pages/Listas/Configuracoes/ListaTiposAtividade'));
const ListaTemperaturaFechamento = React.lazy(() => import('./pages/Listas/Configuracoes/ListaTemperaturaFechamento'));
const ListaMotivosPerda = React.lazy(() => import('./pages/Listas/Configuracoes/ListaMotivosPerda'));

//Atividades
const ListaAnotacoes = React.lazy(() => import('./pages/Listas/Atividades/ListaAnotacoes'));
const ListaOportunidades = React.lazy(() => import('./pages/Listas/Atividades/ListaOportunidades'));
const ListaAtividades = React.lazy(() => import('./pages/Listas/Atividades/ListaAtividades'));

//Acessos
const ListaModulos = React.lazy(() => import('./pages/Listas/Acessos/ListaModulos'));
const ListaPaginas = React.lazy(() => import('./pages/Listas/Acessos/ListaPaginas'));
const ListaUsuarios = React.lazy(() => import('./pages/Listas/Acessos/ListaUsuarios'));
const ListaPerfisAcesso = React.lazy(() => import('./pages/Listas/Acessos/ListaPerfisAcesso'));
const ListaPermissaoAcesso = React.lazy(() => import('./pages/Listas/Acessos/ListaPermissaoAcesso'));

//Icons
const ListaIconsSimpleLine = React.lazy(() => import('./pages/Icons/IconsSimpleLine'));
const ListaIconsFontAwesome = React.lazy(() => import('./pages/Icons/IconsFontAwesome'));
//Relatórios
const RelContatoNumeroOportunidades = React.lazy(() => import('./pages/Relatórios/Contato x Numero Oportunidades'));
const RelContatoValorGanhoPerdido = React.lazy(() => import('./pages/Relatórios/Contato x Valor Ganho e Valor Perdido'));
const RelContatoTempoOportunidade = React.lazy(() => import('./pages/Relatórios/Contato X Temperatura de Oportunidade'));

const TesteValidaForm = React.lazy(() => import('./pages/TesteValidaForm'));

//Erros
const Erro404 = React.lazy(() => import('./pages/Erros/Erro404'));
const Erro500 = React.lazy(() => import('./pages/Erros/Erro500'));


const routes = [

  // Dashboards
  // { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/', exact: true, name: 'Home'},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboardv2', name: 'Dashboardv2', component: Dashboardv2 },
  { path: '/dashboardv3', name: 'Dashboardv3', component: Dashboardv3 },

  // Acessos
  { path: '/logon', name: 'Logon', component: Logon },
  { path: '/modulos', exact: true, name: 'Módulos', component: Modulo },
  { path: '/modulos/:id', name: 'Módulos', component: Modulo },
  { path: '/paginas', exact: true, name: 'Páginas', component: Pagina },
  { path: '/paginas/:id', name: 'Páginas', component: Pagina },
  { path: '/perfis-acesso', name: 'Perfis de Acesso', component: PerfilAcesso },
  { path: '/permissao-acesso', name: 'Permissão deAcesso', component: PermissaoAcesso },
  { path: '/register', name: 'Register', component: Register },
  { path: '/usuarios', exact: true, name: 'Usuários', component: Usuario },
  { path: '/usuarios/:id', name: 'Usuários', component: Usuario },

  //Atividades
  { path: '/anotacoes', exact: true, name: 'Anotações', component: Anotacoes },
  { path: '/anotacoes/:id', name: 'Anotações', component: Anotacoes },
  { path: '/atividades', exact: true, name: 'Atividades', component: Atividades },
  { path: '/atividades/:id', name: 'Atividades', component: Atividades },
  { path: '/atividades/:tipo', name: 'Atividades', component: Atividades },
  { path: '/oportunidades', exact: true, name: 'Oportunidades', component: Oportunidades },
  { path: '/oportunidades/:id', name: 'Oportunidades', component: Oportunidades },


  //Configuração
  { path: '/cargos', exact: true, name: 'Cargos', component: Cargos },
  { path: '/cargos/:id', name: 'Cargos', component: Cargos },
  { path: '/clientes', exact: true, name: 'Clientes', component: Clientes },
  { path: '/clientes/:id', name: 'Clientes', component: Clientes },
  { path: '/contatos', exact: true, name: 'Contatos', component: Contatos },
  { path: '/contatos/:id', name: 'Contatos', component: Contatos },
  { path: '/departamentos', exact: true, name: 'Departamentos', component: Departamentos },
  { path: '/departamentos/:id', name: 'Departamentos', component: Departamentos },
  { path: '/distribuidores', exact : true, name: 'Distribuidores', component: Distribuidores },
  { path: '/distribuidores/:id', name: 'Distribuidores', component: Distribuidores },
  { path: '/temperatura-fechamento', name: 'Temperatura de Fechamento', component: TemperaturaFechamento },
  { path: '/fases-pipe', exact: true, name: 'Fases do Pipe', component: FasesPipe },
  { path: '/fases-pipe/:id', name: 'Fases do Pipe', component: FasesPipe },
  { path: '/marcas/:id', name: 'Marcas', component: Marcas },
  { path: '/marcas', exact: true, name: 'Marcas', component: Marcas },
  { path: '/metas/:id', name: 'Metas', component: Metas },
  { path: '/metas', exact: true, name: 'Metas', component: Metas },
  { path: '/metas-vendedores/:id', name: 'Metas de Vendedores', component: MetasVendedores },
  { path: '/metas-vendedores', exact: true, name: 'Metas de Vendedores', component: MetasVendedores },
  { path: '/motivos-perda/:id', name: 'Motivos de Perda', component: MotivosPerda },
  { path: '/motivos-perda', exact: true, name: 'Motivos de Perda', component: MotivosPerda },
  { path: '/paises', name: 'Países', component: Paises },
  { path: '/pipes', name: 'Pipes', component: Pipes },
  { path: '/produtos/:id', name: 'Produtos', component: Produtos },
  { path: '/produtos', exact: true, name: 'Produtos', component: Produtos },
  { path: '/segmentos-mercado/:id', name: 'Segmentos de Mercado', component: SegmentosMercado },
  { path: '/segmentos-mercado', exact: true, name: 'Segmentos de Mercado', component: SegmentosMercado },
  { path: '/tipos-atividade/:id', name: 'Tipos de Atividade', component: TiposAtividade },
  { path: '/tipos-atividade', exact: true, name: 'Tipos de Atividade', component: TiposAtividade },
  { path: '/tipos-contato/:id', name: 'Tipos de Contato', component: TiposContato },
  { path: '/tipos-contato', exact: true, name: 'Tipos de Contato', component: TiposContato },

  //Tabelas

  //Configuração
  { path: '/lista-cargos', name: 'Lista de Cargos', component: ListaCargos },
  { path: '/lista-contatos', name: 'Lista de Contatos', component: ListaContatos },
  { path: '/lista-tipo-contato', name: 'Lista de Tipos de Contatos', component: ListaTipoContatos },
  { path: '/lista-departamentos', name: 'Lista de Departamentos', component: ListaDepartamentos },
  { path: '/lista-metas', name: 'Lista de Metas', component: ListaMetas },
  { path: '/lista-metas-vendedores', name: 'Lista de Metas de Vendedores', component: ListaMetasVendedores },
  { path: '/lista-metas-vendedores', name: 'Lista de Metas de Vendedores', component: ListaMetasVendedores },
  { path: '/lista-fases-pipes', name: 'Lista de Fases do Pipes', component: ListaFasesPipes},
  { path: '/lista-produtos', name: 'Lista de Produtos', component: ListaProdutos},
  { path: '/lista-distribuidores', name: 'Lista de Distribuidores', component: ListaDistribuidores},
  { path: '/lista-marcas', name: 'Lista de Marcas', component: ListaMarcas},
  { path: '/lista-clientes', name: 'Lista de Clientes', component: ListaClientes},
  { path: '/lista-paises', name: 'Lista de Países', component: ListaPaises},
  { path: '/lista-segmentos-mercado', name: 'Lista de Segmentos de Mercado', component: ListaSegmentosMercado},
  { path: '/lista-tipos-atividade', name: 'Lista de Tipos de Atividade', component: ListaTiposAtividade },
  { path: '/lista-temperatura-fechamento', name: 'Lista de Temperaturas de Fechamento', component: ListaTemperaturaFechamento },
  { path: '/lista-motivos-perda', name: 'Lista de Motivos de Perda', component: ListaMotivosPerda },

  //Atividades
  { path: '/lista-anotacoes', name: 'Lista de Anotações', component: ListaAnotacoes },
  { path: '/lista-oportunidades', name: 'Lista de Oportunidades', component: ListaOportunidades },
  { path: '/lista-atividades', name: 'Lista de Atividades', component: ListaAtividades },

  //Acessos
  { path: '/lista-modulos', name: 'Lista de Módulos', component: ListaModulos },
  { path: '/lista-paginas', name: 'Lista de Páginas', component: ListaPaginas },
  { path: '/lista-usuarios', name: 'Lista de Usuários', component: ListaUsuarios },
  { path: '/lista-perfis-acesso', name: 'Lista de Perfil de Acesso', component: ListaPerfisAcesso },
  { path: '/lista-permissao-acesso', name: 'Lista de Permissão de Acesso', component: ListaPermissaoAcesso },

  //Icons
  { path: '/lista-icons-fontAwesome', name: 'Lista Font Awesome Icons', component: ListaIconsFontAwesome },
  { path: '/lista-icons-simpleLine', name: 'Lista Simple Line', component: ListaIconsSimpleLine },
  
  //Tabelas
  { path: '/rel-contatoxnumeroportunidades', name: ' Relatório de Contato X Número de oportunidades', component: RelContatoNumeroOportunidades },
  { path: '/rel-contatoxvalorganhoperdido', name: ' Relatório de Contato X Valor Ganho e Valor Perdido', component: RelContatoValorGanhoPerdido},
  { path: '/rel-contatoxtempoportunidade', name: ' Relatório de Contato X Temperatura de Oportunidade', component: RelContatoTempoOportunidade},

  { path: '/teste-validaForm', name: 'TesteValidaForm', component: TesteValidaForm},

  //erros
  { path: '/erro-404', name: 'Error 404', component: Erro404},
  { path: '/erro-500', name: 'Error 500', component: Erro500},

];

export default routes;
