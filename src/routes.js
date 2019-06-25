import HelloWorld from './components/HelloWorld'

export const routes = [
  { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
  { path: '*', redirect: '/' }
]
