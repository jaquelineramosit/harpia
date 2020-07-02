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
      url: '/lista-oportunidades',
      icon: 'fa fa-money',
    },
    {
      name: 'Atividades',
      url: '/lista-atividades',
      icon: 'fa fa-tasks',
    },
    
    {
      name: 'Anotações',
      url: '/lista-anotacoes',
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
          url: '/lista-contatos',
          icon: 'fa fa-address-book-o',
        },
        {
          name: 'Tipos de Contato',
          url: '/lista-tipo-contato',
          icon: 'fa fa-address-card',
        },
        {
          name: 'Cargos',
          url: '/lista-cargos',
          icon: 'fa fa-mortar-board',
        },
        {
          name: 'Departamentos',
          url: '/lista-departamentos',
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
          url: '/lista-metas',
          icon: 'icon-target',
        },
        {
          name: 'Metas Vendedores',
          url: '/lista-metas-vendedores',
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
          url: '/lista-fases-pipes',
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
        url: '/lista-produtos',
        icon: 'fa fa-th-large',          
        },
        {
          name: 'Distribuidores',
          url: '/lista-distribuidores',
          icon: 'fa fa-building-o',          
        },        
        {
          name: 'Marcas',
          url: '/lista-marcas',
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
          url: '/lista-clientes',
          icon: 'fa fa-users',
        },
        {
          name: 'Paises',
          url: '/lista-paises',
          icon: 'fa fa-flag-o',
        },
        {
          name: 'Segmentos Mercado',
          url: '/lista-segmentos-mercado',
          icon: 'icon-directions',
        },
      ],
    },
    {
      name: 'Tipos de Atividades',
      url: '/lista-tipos-atividade',
      icon: 'icon-list',      
    },
    {
      name: 'Temperat. Fechamento',
      url: '/lista-temperatura-fechamento',
      icon: 'fa fa-thermometer',      
    },
    {
      name: 'Motivo da Perda',
      url: '/lista-motivos-perda',
      icon: 'fa fa-comments',      
    },
    {
      name: 'Acessos',      
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Usuários',
          url: '/lista-usuarios',
          icon: 'fa fa-user-circle',
        },
        {
          name: 'Perfil de Acesso',
          url: '/lista-perfis-acesso',
          icon: 'fa fa-id-card',
        },
        {
          name: 'Permissão de Acesso',
          url: '/lista-permissao-acesso',
          icon: 'fa fa-user-secret',
        },
        {
          name: 'Módulos',
          url: '/lista-modulos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Páginas',
          url: '/lista-paginas',
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
