'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('register', 'Auth/RegisterController.index').as('register.index')
Route.post('register', 'Auth/RegisterController.store').as('register.store')

Route.get('login', 'Auth/LoginController.index').as('login.index').middleware(['RedirectIfAuthenticated'])
Route.post('login', 'Auth/LoginController.check').as('login.check').middleware(['RedirectIfAuthenticated'])
Route.get('logout', 'Auth/LoginController.logout').as('logout').middleware(['Authenticate'])

Route.get('dashboard', 'DashboardController.index').as('dashboard').middleware(['Authenticate'])

Route.get('post', 'PostController.index').as('post.index').middleware(['Authenticate'])
Route.get('post/create', 'PostController.create').as('post.create').middleware(['Authenticate'])
Route.post('post', 'PostController.store').as('post.store').middleware(['Authenticate'])
Route.get('post/:id/edit', 'PostController.edit').as('post.edit').middleware(['Authenticate'])
Route.put('post/:id', 'PostController.update').as('post.update').middleware(['Authenticate'])
Route.delete('post/:id', 'PostController.destroy').as('post.destroy').middleware(['Authenticate'])