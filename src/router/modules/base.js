import Layout from '@/layout'

const baseRouter = {
  path: '/base',
  component: Layout,
  //redirect: '/table/complex-table',
  name: 'Base',
  meta: {
    title: 'base',
    icon: 'base',
		permission : '/base'
  },
  children: [
	{
	  path: 'base-materiel',
	  component: () => import('@/views/base/Materiel/materiel'),
	  name: 'Materiel',
	  meta: { title: 'materiel', permission: '/base/Materiel', icon: 'materiel' }
	},
    {
      path: 'base-KnifeTool',
      component: () => import('@/views/base/KnifeTool/KnifeTool'),
      name: 'KnifeTool',
      meta: { title: 'knifeTool', permission: '/base/KnifeTool', icon: 'knifeTool' }
    },
	{
	  path: 'base-Mould',
	  component: () => import('@/views/base/Mould/Mould'),
	  name: 'Mould',
	  meta: { title: 'mould', permission: '/base/Mould', icon: 'mould' }
	},
	{
	  path: 'base-Measuring',
	  component: () => import('@/views/base/Measuring/Measuring'),
	  name: 'Measuring',
	  meta: { title: 'measuring', permission: '/base/Measuring', icon: 'measuring' }
	},
	{
	  path: 'base-clamp',
	  component: () => import('@/views/base/Clamp/Clamp'),
	  name: 'Clamp',
	  meta: { title: 'fixture', permission: '/base/Clamp', icon: 'fixture' }
	},
	// {
	//   path: 'base-equipment',
	//   component: () => import('@/views/base/Equipment/Equipment'),
	//   name: 'Equipment',
	//   meta: { title: 'equipment', icon: 'equipment' }
	// },
  ]
}
export default baseRouter