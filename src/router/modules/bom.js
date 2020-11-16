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
	}
  ]
}
export default bomRouter