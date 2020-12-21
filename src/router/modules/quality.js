import Layout from '@/layout'

const planRouter = {
  path: '/quality',
  component: Layout,
  name: 'Quality Manage',
  meta: {
    title: 'quality',
    icon: 'quality',
		permission : '/quality'
  },
  children: [
    {
      path: 'quality-task',
      component: () => import('@/views/quality/qualityTask/qualityTask'),
      name: 'QualityTask',
      meta: { title: 'qualityTask', permission: '/quality/qualityTask', icon: 'qualityTask' }
    },
    {
      path: 'quality-density',
      component: () => import('@/views/quality/densityTask/densityTask'),
      name: 'DensityTask',
      meta: { title: 'densityTask', permission: '/quality/densityTask', icon: 'qualityTask' }
    },
    {
      path: 'quality-hardness',
      component: () => import('@/views/quality/hardnessTask/hardnessTask'),
      name: 'HardnessTask',
      meta: { title: 'hardnessTask', permission: '/quality/hardnessTask', icon: 'qualityTask' }
    },
    {
      path: 'quality-History',
      component: () => import('@/views/quality/qualityHistory/qualityHistory'),
      name: 'QualityHistory',
      meta: { title: 'qualityHistory', permission: '/quality/qualityHistory', icon: 'qualityHistory' }
    },
    {
      path: 'quality-spcManager',
      component: () => import('@/views/quality/spcManager/spc'),
      name: 'QualitySpcManager',
      meta: { title: 'qualitySpcManager', permission: '/quality/spcManager', icon: 'qualityHistory' }
    }
  ]
}
export default planRouter
