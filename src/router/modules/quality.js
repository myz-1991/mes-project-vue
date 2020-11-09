import Layout from '@/layout'

const planRouter = {
  path: '/quality',
  component: Layout,
  name: 'Quality Manage',
  meta: {
    title: 'quality',
    icon: 'quality'
  },
  children: [
    {
      path: 'quality-task',
      component: () => import('@/views/quality/qualityTask/qualityTask'),
      name: 'QualityTask',
      meta: { title: 'qualityTask', icon: 'qualityTask' }
    },
    {
      path: 'quality-History',
      component: () => import('@/views/quality/qualityHistory/qualityHistory'),
      name: 'QualityHistory',
      meta: { title: 'qualityHistory', icon: 'qualityHistory' }
    }
  ]
}
export default planRouter
