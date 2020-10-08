
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/attendance', component: () => import('pages/Index.vue') },
      { path: '/lectures', component: () => import('pages/Lectures.vue') },
      { path: '/students', component: () => import('pages/Students.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
