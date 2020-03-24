'use strict'

const User = use('App/Models/User')
const {validate} = use('Validator')

class RegisterController {
    index({view}) {
        return view.render('auth.register')
    }

    async store({request, session, response}) {
        const rules = {
            username: 'required',
            email: 'required|unique:users,email',
            password: 'required'
        }

        const message = {
            'username.required': 'username tidak boleh kosong',
            'email.required': 'email tidak boleh kosong',
            'email.unique': 'email sudah terdaftar',
            'password.required': 'password tidak boleh kosong'
        }

        const validation = await validate(request.all(), rules, message)

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])
            return response.redirect('back')
        }

        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password')
        })

        session.flash({notification: 'Register berhasil'})
        return response.redirect('back')

    }
}

module.exports = RegisterController
