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
      url: '/oportunidades',
      icon: 'fa fa-money',
    },
    {
      name: 'Atividades',
      url: '/atividades',
      icon: 'fa fa-tasks',
    },
    
    {
      name: 'Anotações',
      url: '/anotacoes',
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
          url: '/contatos',
          icon: 'fa fa-address-book-o',
        },
        {
          name: 'Tipos de Contato',
          url: '/tipos-contato',
          icon: 'fa fa-address-card',
        },
        {
          name: 'Cargos',
          url: '/cargos',
          icon: 'fa fa-mortar-board',
        },
        {
          name: 'Departamentos',
          url: '/departamentos',
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
          url: '/metas',
          icon: 'icon-target',
        },
        {
          name: 'Metas Vendedores',
          url: '/metas-vendedores',
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
          url: '/pipes',
          icon: 'icon-chart',
        },
        {
          name: 'Fases do Pipe',
          url: '/fases-pipe',
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
        url: '/produtos',
        icon: 'fa fa-th-large',          
        },
        {
          name: 'Distribuidores',
          url: '/distribuidores',
          icon: 'fa fa-building-o',          
        },        
        {
          name: 'Marcas',
          url: '/marcas',
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
          url: '/clientes',
          icon: 'fa fa-users',
        },
        {
          name: 'Paises',
          url: '/paises',
          icon: 'fa fa-flag-o',
        },
        {
          name: 'Segmentos Mercado',
          url: '/segmentos-mercado',
          icon: 'icon-directions',
        },
      ],
    },
    {
      name: 'Tipos de Atividades',
      url: '/tipos-atividade',
      icon: 'icon-list',      
    },
    {
      name: 'Expec. de Fechamento',
      url: '/expectativas-fechamento',
      icon: 'fa fa-handshake-o',      
    },
    {
      name: 'Motivo da Perda',
      url: '/motivos-perda',
      icon: 'fa fa-comments',      
    },
    {
      name: 'Acessos',      
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Usuários',
          url: '/usuarios',
          icon: 'fa fa-user-circle',
        },
        {
          name: 'Perfil de Acesso',
          url: '/perfil-acesso',
          icon: 'fa fa-id-card',
        },
        {
          name: 'Permissão de Acesso',
          url: '/permissao-acesso',
          icon: 'fa fa-user-secret',
        },
        {
          name: 'Módulos',
          url: '/modulos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Páginas',
          url: '/paginas',
          icon: 'fa fa-window-maximize',
        },
      ],
    },
  ],
};
