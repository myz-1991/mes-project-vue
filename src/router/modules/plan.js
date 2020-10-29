// import Layout from '@/layout'

// const planRouter = {
//   path: '/planManage',
//   component: Layout,
//   name: 'planManage',
//   meta: {
//     title: 'planManage',
//     icon: 'plan'
//   },
//   children: [
//     {
//       path: 'plan-planManage',
//       component: () => import('@/views/plan/planManage/planManage'),
//       name: 'PlanManage',
//       meta: { title: 'planManage', icon: 'planManage' }
//     },
//   ]
// }
// export default planRouter
import Layout from '@/layout'

const planRouter = {
  path: '/plan',
  component: Layout,
  name: 'Plan Manage',
  meta: {
    title: 'plan',
    icon: 'plan'
  },
  children: [
    {
      path: 'plan-receive',
      component: () => import('@/views/plan/planManage/planManage'),
      name: 'PlanManage',
      meta: { title: 'planManage', icon: 'receive' }
    },
    {
      path: 'plan-dispatch',
      component: () => import('@/views/plan/workJobManage/workJobManage'),
      name: 'PlanDispatch',
      meta: { title: 'planDispatch', icon: 'dispatch' }
    }
  ]
}
export default planRouter
