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
      name: 'storageDefinition',
      meta: { title: 'storageDefinition', permission: '/storage/storageDefinition', icon: 'storageDefinition' }
    },
		{
		  path: 'storage-storageIn',
		  component: () => import('@/views/storage/storageIn/storageIn'),
		  name: 'storageIn',
		  meta: { title: 'storageIn', permission: '/storage/storageIn', icon: 'storageIn' }
		},
		{
		  path: 'storage-storageOut',
		  component: () => import('@/views/storage/storageOut/storageOut'),
		  name: 'storageOut',
		  meta: { title: 'storageOut', permission: '/storage/storageOut', icon: 'storageOut' }
		},
		{
		  path: 'storage-history',
		  component: () => import('@/views/storage/storageInOutHistory/history'),
		  name: 'storageHistory',
		  meta: { title: 'storageHistory', permission: '/storage/storageInOutHistory', icon: 'history' }
		}
  ]
}
export default storageRouter
