import Layout from '@/layout'

const factoryModelingRouter = {
  path: '/factoryModeling',
  component: Layout,
  //redirect: '/table/complex-table',
  name: 'FactoryModeling',
  meta: {
    title: 'factoryModeling',
    icon: 'factory',
	permission : '/factoryModeling'
  },
  children: [
	{
	  path: 'factory-equipment',
	  component: () => import('@/views/factoryModeling/Equipment/Equipment'),
	  name: 'Equipment',
	  meta: { title: 'equipment', permission: '/factoryModeling/Equipment', icon: 'equipment' }
	},
    {
      path: 'factoryModeling-Frequency',
      component: () => import('@/views/factoryModeling/Frequency/Frequency'),
      name: 'Frequency',
      meta: { title: 'frequency', permission: '/factoryModeling/Frequency', icon: 'frequency' }
    },
	{
	  path: 'factoryModeling-ShopCalendar',
	  component: () => import('@/views/factoryModeling/ShopCalendar/ShopCalendar'),
	  name: 'ShopCalendar',
	  meta: { title: 'shopCalendar', permission: '/factoryModeling/ShopCalendar', icon: 'calendar' }
	}
  ]
}
export default factoryModelingRouter