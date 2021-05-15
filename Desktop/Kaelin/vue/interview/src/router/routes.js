export default [
  { name: 'Login', path: '/login', component: () => import('@/views/Login') },
  {
    name: 'Home',
    path: '/',
    redirect: { name: 'Discover' },
    component: () => import('@/views/Home'),
    children: [
      { name: 'Company', path: 'company', component: () => import('@/views/Home/Company') },
      {
        name: 'Question',
        path: 'question',
        component: () => import('@/views/Home/Question'),
        meta: { title: '题库', needLogin: true },
      },
      { name: 'Discover', path: 'discover', component: () => import('@/views/Home/Discover') },
      {
        name: 'Mine',
        path: 'mine',
        component: () => import('@/views/Home/Mine'),
        meta: { title: '我的', needLogin: true },
      },
      {
        name: 'MineInfo',
        path: 'mine_info',
        component: () => import('@/views/Home/MineInfo'),
        meta: { title: '我的信息', needLogin: true, unwantedTabber: true },
      },
      {
        name: 'MineEdit',
        path: 'mine_edit',
        component: () => import('@/views/Home/MineEdit'),
        meta: { title: '修改信息', needLogin: true, unwantedTabber: true },
      },
      {
        name: 'DataList',
        path: 'data_list',
        component: () => import('@/views/Home/DataList'),
        meta: { title: '数据列表', unwantedTabber: true },
      },
      {
        name: 'ChartData',
        path: 'chart_data',
        component: () => import('@/views/Home/ChartData'),
        meta: { title: '数据列表', unwantedTabber: true },
      },
      {
        name: 'Search',
        path: 'search',
        component: () => import('@/views/Home/Search'),
        meta: { title: '搜索', unwantedTabber: true },
      },
    ],
    meta: { title: '首页' },
  },
];
