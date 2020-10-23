import Layout from '@/layout'

const bomRouter = {
  path: '/bom',
  component: Layout,
  //redirect: '/table/complex-table',
  name: 'Bom',
  meta: {
    title: 'bom',
    icon: 'bom'
  },
  children: [
	{
	  path: 'bom-relation',
	  component: () => import('@/views/bom/Relation/relation'),
	  name: 'Relation',
	  meta: { title: 'relation', icon: 'relation' }
	},
    {
      path: 'bom-ProcessRoute',
      component: () => import('@/views/bom/ProcessRoute/processRoute'),
      name: 'ProcessRoute',
      meta: { title: 'processRoute', icon: 'processRoute' }
    },
	{
	  path: 'bom-Process',
	  component: () => import('@/views/bom/Process/process'),
	  name: 'Process',
	  meta: { title: 'process', icon: 'process' }
	}
  ]
}
export default bomRouter