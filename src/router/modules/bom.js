import Layout from '@/layout'

const bomRouter = {
  path: '/bom',
  component: Layout,
  //redirect: '/table/complex-table',
  name: 'Bom',
  meta: {
    title: 'bom',
    icon: 'bom',
		permission : '/bom'
  },
  children: [
	{
	  path: 'bom-relation',
	  component: () => import('@/views/bom/Relation/relation'),
	  name: 'Relation',
	  meta: { title: 'relation', permission: '/bom/Relation', icon: 'relation' }
	},
    {
      path: 'bom-ProcessRoute',
      component: () => import('@/views/bom/ProcessRoute/processRoute'),
      name: 'ProcessRoute',
      meta: { title: 'processRoute', permission: '/bom/ProcessRoute', icon: 'processRoute' }
    },
	{
	  path: 'bom-Process',
	  component: () => import('@/views/bom/Process/process'),
	  name: 'Process',
	  meta: { title: 'process', permission: '/bom/Process', icon: 'process' }
	},
  {
    path: 'bom-defects',
    component: () => import('@/views/bom/Defects/Defects'),
    name: 'Defects',
    meta: { title: 'defects', permission: '/bom/Defects', icon: 'checkItem' }
  },
  {
    path: 'bom-checkitem',
    component: () => import('@/views/bom/CheckItem/checkitem'),
    name: 'CheckItem',
    meta: { title: 'checkitem', permission: '/bom/CheckItem', icon: 'checkItem' }
  }
  ]
}
export default bomRouter
