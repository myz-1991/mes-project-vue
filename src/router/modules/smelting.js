import Layout from '@/layout'

const smeltingRouter = {
  path: '/smelting',
  component: Layout,
  //redirect: '/table/complex-table',
  name: 'Smelting',
  meta: {
    title: 'smelting',
    icon: 'smelting'
  },
  children: [
	{
	  path: 'semlting-task',
	  component: () => import('@/views/smelting/smeltingTask/smeltingTask'),
	  name: 'SmeltingTask',
	  meta: { title: 'smeltingTask', icon: 'smeltingTask' }
	},
  {
    path: 'semlting-stock',
    component: () => import('@/views/smelting/smeltingStock/smeltingStock'),
    name: 'SmeltingStock',
    meta: { title: 'smeltingStock', icon: 'stock' }
  },
  ]
}
export default smeltingRouter
