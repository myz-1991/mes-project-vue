import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  name: 'systemDispose',
  meta: {
    title: 'systemDispose',
    icon: 'system'
  },
  children: [
	{
	  path: 'system-org',
	  component: () => import('@/views/system/organization/organizations'),
	  name: 'Organizations',
	  meta: { title: 'organizations', icon: 'organizations' }
	},
    {
      path: 'system-user',
      component: () => import('@/views/system/user'),
      name: 'UserManagement',
      meta: { title: 'userManagement', icon: 'user' }
    },
	{
	  path: 'system-role',
	  component: () => import('@/views/system/Role/role'),
	  name: 'Role',
	  meta: { title: 'role', icon: 'role' }
	},
	{
	  path: 'system-menu',
	  component: () => import('@/views/system/Resource/menu'),
	  name: 'Menu',
	  meta: { title: 'menu', icon: 'menu' }
	},
	{
	  path: 'system-dict',
	  component: () => import('@/views/system/Dict/dictionary'),
	  name: 'Dictionary',
	  meta: { title: 'dictionary', icon: 'dictionary' }
	},
  ]
}
export default systemRouter