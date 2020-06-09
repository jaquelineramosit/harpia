export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboardv1',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        // text: 'NEW',
      },
    },
    {
      title: true,
      name: 'ATIVIDADES',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Oportunidades',
      url: '/list-oportunidades',
      icon: 'fa fa-money',
    },
    {
      name: 'Atividades',
      url: '/list-atividades',
      icon: 'fa fa-tasks',
    },
    
    {
      name: 'Anotações',
      url: '/list-anotacoes',
      icon: 'icon-note',
    },
    {
      title: true,
      name: 'CONFIGURAÇÕES',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Contatos',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'Contatos',
          url: '/list-contatos',
          icon: 'fa fa-address-book-o',
        },
        {
          name: 'Tipos de Contato',
          url: '/list-tipocontato',
          icon: 'fa fa-address-card',
        },
        {
          name: 'Cargos',
          url: '/list-cargos',
          icon: 'fa fa-mortar-board',
        },
        {
          name: 'Departamentos',
          url: '/list-departamentos',
          icon: 'fa fa-university',
        },        
      ],
    },
    {
      name: 'Metas',
      icon: 'icon-target',
      children: [
        {
          name: 'Metas',
          url: '/list-metas',
          icon: 'icon-target',
        },
        {
          name: 'Metas Vendedores',
          url: '/list-metasvendedores',
          icon: 'fa fa-bullseye',
        },        
      ],
    },
    {
      name: 'Pipes',
      icon: 'icon-chart',
      children: [
        {
          name: 'Pipes',
          url: '/list-pipes',
          icon: 'icon-chart',
        },
        {
          name: 'Fases do Pipe',
          url: '/list-fasespipes',
          icon: 'icon-layers',
        },        
      ],
    },    
    {
      name: 'Produtos',      
      icon: 'fa fa-th-large',
      children: [
        {
        name: 'Produtos',
        url: '/list-produtos',
        icon: 'fa fa-th-large',          
        },
        {
          name: 'Distribuidores',
          url: '/list-distribuidores',
          icon: 'fa fa-building-o',          
        },        
        {
          name: 'Marcas',
          url: '/list-marcas',
          icon: 'fa fa-tags',
        },        
      ],
    },
    {
      name: 'Clientes',      
      icon: 'fa fa-users',
      children: [
        {
          name: 'Clientes',
          url: '/list-clientes',
          icon: 'fa fa-users',
        },
        {
          name: 'Paises',
          url: '/list-paises',
          icon: 'fa fa-flag-o',
        },
        {
          name: 'Segmentos Mercado',
          url: '/list-segmentosmercado',
          icon: 'icon-directions',
        },
      ],
    },
    {
      name: 'Tipos de Atividades',
      url: '/list-tiposatividade',
      icon: 'icon-list',      
    },
    {
      name: 'Expec. de Fechamento',
      url: '/list-expectativasfechamento',
      icon: 'fa fa-handshake-o',      
    },
    {
      name: 'Motivo da Perda',
      url: '/list-motivosperda',
      icon: 'fa fa-comments',      
    },
    {
      name: 'Acessos',      
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Usuários',
          url: '/list-usuarios',
          icon: 'fa fa-user-circle',
        },
        {
          name: 'Perfil de Acesso',
          url: '/list-perfisacesso',
          icon: 'fa fa-id-card',
        },
        {
          name: 'Permissão de Acesso',
          url: '/list-permissaoacesso',
          icon: 'fa fa-user-secret',
        },
        {
          name: 'Módulos',
          url: '/list-modulos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Páginas',
          url: '/list-paginas',
          icon: 'fa fa-window-maximize',
        },
      ],
    },
    {
      name: 'Relatórios',
      icon: 'fa fa-bar-chart',
      children: [
        {
          name: 'Contato X Oportunidades',
          url: '/rel-contatoxnumeroportunidades',
          icon: 'fa fa-bar-chart',
        },
        {
          name: 'Contato X Valor Ganho/Perdido',
          url: '/rel-contatoxvalorganhoperdido',
          icon: 'fa fa-bar-chart',
        },
        {
          name: 'Contato X Temperatura das oportunidades',
          url: '/rel-contatoxtempoportunidade',
          icon: 'fa fa-bar-chart',
        },          
      ],
    },
  ],
};
