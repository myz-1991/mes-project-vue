import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  name: 'systemDispose',
  meta: {
    title: 'systemDispose',
		permission : '/system',
    icon: 'system'
  },
  children: [
	{
	  path: 'system-org',
	  component: () => import('@/views/system/organization/organizations'),
	  name: 'Organizations',
	  meta: { title: 'organizations', permission: '/system/organization',  icon: 'organizations' }
	},
    {
      path: 'system-user',
      component: () => import('@/views/system/user'),
      name: 'UserManagement',
      meta: { title: 'userManagement', permission: '/system/user', icon: 'user' }
    },
	{
	  path: 'system-role',
	  component: () => import('@/views/system/Role/role'),
	  name: 'Role',
	  meta: { title: 'role', permission: '/system/Role', icon: 'role' }
	},
	{
	  path: 'system-menu',
	  component: () => import('@/views/system/Resource/menu'),
	  name: 'Menu',
	  meta: { title: 'menu', permission: '/system/Resource', icon: 'menu' }
	},
	{
	  path: 'system-dict',
	  component: () => import('@/views/system/Dict/dictionary'),
	  name: 'Dictionary',
	  meta: { title: 'dictionary', permission: '/system/Dict', icon: 'dictionary' }
	},
  ]
}
export default systemRouter