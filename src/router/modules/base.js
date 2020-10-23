import Layout from '@/layout'

const baseRouter = {
  path: '/base',
  component: Layout,
  //redirect: '/table/complex-table',
  name: 'Base',
  meta: {
    title: 'base',
    icon: 'base'
  },
  children: [
	{
	  path: 'base-materiel',
	  component: () => import('@/views/base/Materiel/materiel'),
	  name: 'Materiel',
	  meta: { title: 'materiel', icon: 'materiel' }
	},
    {
      path: 'base-KnifeTool',
      component: () => import('@/views/base/KnifeTool/KnifeTool'),
      name: 'KnifeTool',
      meta: { title: 'knifeTool', icon: 'knifeTool' }
    },
	{
	  path: 'base-Mould',
	  component: () => import('@/views/base/Mould/Mould'),
	  name: 'Mould',
	  meta: { title: 'mould', icon: 'mould' }
	},
	{
	  path: 'base-Measuring',
	  component: () => import('@/views/base/Measuring/Measuring'),
	  name: 'Measuring',
	  meta: { title: 'measuring', icon: 'measuring' }
	},
	{
	  path: 'base-fixture',
	  component: () => import('@/views/base/Fixture/Fixture'),
	  name: 'Fixture',
	  meta: { title: 'fixture', icon: 'fixture' }
	},
	{
	  path: 'base-equipment',
	  component: () => import('@/views/base/Equipment/Equipment'),
	  name: 'Equipment',
	  meta: { title: 'equipment', icon: 'equipment' }
	},
  ]
}
export default baseRouter