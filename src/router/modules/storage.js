import Layout from '@/layout'

const storageRouter = {
  path: '/storage',
  component: Layout,
  name: 'Storage Manage',
  meta: {
    title: 'storage',
    icon: 'storage',
		permission : '/storage'
  },
  children: [
    {
      path: 'storage-definition',
      component: () => import('@/views/storage/storageDefinition/storageDefinition'),
      name: 'QualityTask',
      meta: { title: 'storageDefinition', permission: '/storage/storageDefinition', icon: 'storageDefinition' }
    }
  ]
}
export default storageRouter
