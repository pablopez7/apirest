'use strict'

const bcrypt = require('bcrypt-nodejs')
const mongoosePaginate = require('mongoose-pagination')
const User = require('../models/userModel')
const jwt = require('../services/jwt')

let UserCtrl = {}

UserCtrl.saveUser = (req, res) => {
    const params = req.body
    const user = new User()

    if (params.name && params.surname && params.nick && params.email && params.password) {

        user.name = params.name
        user.surname = params.surname
        user.nick = params.nick
        user.email = params.email
        user.role = 'ROLE_USER'
        user.picture = null


        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({
                message: `Error en la peticion. ${err}`
            })

            if (users && users.length >= 1) {
                return res.status(200).send({
                    message: `El usuario ya existe.`
                })
            }else{
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash
                    user.save((err, userStored) => {
        
                        if (err) return res.status(500).send({ message : `Error al guardar al Usuario. ${err}` })
        
                        if (userStored) {
                            res.status(200).send({ user: userStored })
                        }else{
                            res.status(404).send({ message: `El usuario no ha sido registrado`})
                        }
        
                    })
                })
            }
        })

    }else{
        res.status(200).send({ message: `Envia todos los datos.` })
    }
}

UserCtrl.loginUser = (req, res) => {
    const params = req.body
    
    const email = params.email
    const password = params.password

    User.findOne({ email : email }, (err, user) => {
        if (err) return res.status(500).send({ message : `Error en la peticion. ${err}` })
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    }else{
                        //No envia el password
                        user.password = undefined
                        return res.status(200).send({ user })
                    }

                }else{
                    res.status(404).send({ message: `No se ha podido identificar`})
                }
            })
        }else{
            res.status(404).send({ message: `No se ha podido identificar!!`})
        }
    })
}

UserCtrl.getUser = (req, res) => {
    const userId = req.params.id

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message : `No se encontro al Usuario. ${err}` })

        if (!user) return res.status(404).send({ message : `El usuario no existe` })

        return res.status(200).send({ user })
    })
}

UserCtrl.getUsers = (req, res) => {
    //const identity_user_id = req.user.sub

    const page = req.params.page

    const itemsPerPage = 5

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err) return res.status(500).send({ message : `Error en la peticion. ${err}` })

        if (!users) return res.status(404).send({ message : `El usuario no existe` })

        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })
    })
    
}

module.exports = UserCtrl