'use strict'

const Post = use('App/Models/Post')

class PostController {

   async index({view}) {
        const posts = await Post.all()
        return view.render('post.index', {posts: posts.toJSON()})
    }

    create({view}) {
        return view.render('post.create')
    }

    async store({request, session, response}) {
        try {
            await Post.create({
                title: request.input('title'),
                content: request.input('content')
            })

            session.flash({ message: 'Post added!', response: true })
            return response.route('post')
        } catch (error) {
            console.log(error)
            session.flash({ message: 'Failed add!', response: false })
            return response.redirect('back')
        }
    }

    async edit({params, request, response, view}) {
        try {
            const post = await Post.find(params.id)
            return view.render('post.edit', {post: post})
        } catch (error) {
            console.log(error)
            return response.redirect('back')
        }
    }

    async update({params, request, response, session}) {
        try {
            const title = request.input('title')
            const content = request.input('content')
            const post = await Post.find(params.id)
            post.title = title
            post.content = content

            await post.save()
            session.flash({ message: 'Post updated!', response: true })
            return response.route('post.index')
        } catch (error) {
            console.log(error)
            return response.redirect('back')
        }
    }

    async destroy({params, session, response}) {
        try {
            const post = await Post.find(params.id)
            await post.delete()

            session.flash({ message: 'Post deleted!', response: true })
            return response.redirect('back')
        } catch (error) {
            console.log(error)
            return response.redirect('back')
        }
    }
}

module.exports = PostController
