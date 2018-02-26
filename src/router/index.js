import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/BookList'
import ShowBook from '@/components/ShowBook'
import CreateBook from '@/components/CreateBook'
import EditBook from '@/components/EditBook'
import InicioAdmin from '@/components/InicioAdmin'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'InicioAdmin',
      component: InicioAdmin
    },
    {
      path: '/lista',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/show-book/:id',
      name: 'ShowBook',
      component: ShowBook
    },
    {
      path: '/add-book',
      name: 'CreateBook',
      component: CreateBook
    },
    {
      path: '/edit-book/:id',
      name: 'EditBook',
      component: EditBook
    }
  ]
})
