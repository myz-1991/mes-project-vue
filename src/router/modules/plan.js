import Layout from '@/layout'

const planRouter = {
  path: '/plan',
  component: Layout,
  name: 'Plan Manage',
  meta: {
    title: 'plan',
    icon: 'plan',
		permission : '/plan'
  },
  children: [
    {
      path: 'plan-receive',
      component: () => import('@/views/plan/planManage/planManage'),
      name: 'PlanManage',
      meta: { title: 'planManage', permission: '/plan/planManage', icon: 'receive' }
    },
    {
      path: 'plan-dispatch',
      component: () => import('@/views/plan/workJobManage/workJobManage'),
      name: 'PlanDispatch',
      meta: { title: 'planDispatch', permission: '/plan/workJobManage', icon: 'dispatch' }
    }
  ]
}
export default planRouter
