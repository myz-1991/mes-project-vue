import Layout from '@/layout'

const eqRouter = {
  path: '/equipment',
  component: Layout,
  name: 'Equipment',
  meta: {
    title: 'equipment',
    icon: 'equipment',
    permission: 'equipment'
  },
  children: [
    {
      path: 'equipmentManage',
      component: () => import('@/views/equipment/a'),
      name: 'equipmentManage',
      meta: { title: 'equipmentManage', permission: '/equipment/equipmentManage', icon: 'receive' }
    },
    // {
    //   path: 'equipmentStatus',
    //   component: () => import('@/views/equipment/equipmentStatus'),
    //   name: 'equipmentStatus',
    //   meta: { title: 'equipmentStatus', permission: '/equipment/equipmentStatus', icon: 'receive' }
    // },
    {
      path: 'realTimeEquipment',
      component: () => import('@/views/equipment/realTimeEquipment'),
      name: 'realTimeEquipment',
      meta: { title: 'realTimeEquipment', permission: '/equipment/realTimeEquipment', icon: 'receive' }
    },
    {
      path: 'equipmentStatus',
      component: () => import('@/views/equipment/status'),
      name: 'equipmentStatus',
      meta: { title: 'equipmentStatus', permission: '/equipment/equipmentStatus', icon: 'receive' }
    },
    // {
    //   path: 'utilization',
    //   component: () => import('@/views/equipment/utilization'),
    //   name: 'utilization',
    //   meta: { title: 'utilization', permission: '/equipment/utilization', icon: 'receive' }
    // },
    // {
    //   path: 'schedule',
    //   component: () => import('@/views/equipment/schedule'),
    //   name: 'schedule',
    //   meta: { title: 'schedule', permission: '/equipment/schedule', icon: 'receive' }
    // },
    // {
    //   path: 'yield',
    //   component: () => import('@/views/equipment/yield'),
    //   name: 'yield',
    //   meta: { title: 'yield', permission: '/equipment/yield', icon: 'receive' }
    // },
    {
      path: 'yieldStatement',
      component: () => import('@/views/equipment/yieldStatement'),
      hidden: true,
      name: 'YieldStatement',
      meta: { title: 'yieldStatement', permission: '/equipment/yieldStatement', icon: 'receive' }
    },
    {
      path: 'equipmentStatusLeft1',
      component: () => import('@/views/equipment/equipmentStatusLeft1'),
      hidden: true,
      name: 'EquipmentStatusLeft1',
      meta: { title: 'equipmentStatusLeft1', permission: '/equipment/equipmentStatusLeft1', icon: 'receive' }
    }
    // {
    //   path: 'warningMessage',
    //   component: () => import('@/views/equipment/warningMessage'),
    //   name: 'warningMessage',
    //   meta: { title: 'warningMessage', permission: '/equipment/warningMessage', icon: 'receive' }
    // },
    // {
    //   path: 'reject',
    //   component: () => import('@/views/equipment/reject'),
    //   name: 'reject',
    //   meta: { title: 'reject', permission: '/equipment/reject', icon: 'receive' }
    // }
  ]
}
export default eqRouter
