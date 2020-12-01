import Layout from '@/layout'

const smeltingRouter = {
  path: '/smelt',
  component: Layout,
  //redirect: '/table/complex-table',
  name: 'Smelt',
  meta: {
    title: 'smelting',
    icon: 'smelting',
		permission: 'smelt'
  },
  children: [
	{
	  path: 'semlting-task',
	  component: () => import('@/views/smelt/smeltTask/smeltTask'),
	  name: 'SmeltingTask',
	  meta: { title: 'smeltingTask', permission: '/smelt/smeltTask', icon: 'smeltingTask' }
	},
  {
    path: 'semlting-stock',
    component: () => import('@/views/smelt/smeltStock/smeltStock'),
    name: 'SmeltingStock',
    meta: { title: 'smeltingStock', permission: '/smelt/smeltStock', icon: 'stock' }
  },
  {
    path: 'semlting-crucible',
    component: () => import('@/views/smelt/crucible/crucible'),
    name: 'Crucible',
    meta: { title: 'crucible', permission: '/smelt/crucible', icon: 'stock' }
  },
	{
	  path: 'semlting-check',
	  component: () => import('@/views/smelt/check/check'),
	  name: 'check',
	  meta: { title: 'semltCheck', permission: '/smelt/check', icon: 'stock' }
	}
  ]
}
export default smeltingRouter
