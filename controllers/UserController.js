const User = require("../models/User")


class UserController {


    async find(req,res) {

        var result = await User.getAll()

        if(result.status) {

            res.json(result.result)

        }else {

            res.json({err: result.err})

        }

    }


    async findById(req,res) {

        var id = req.params.id

        var result = await User.getById(id)

        if(result.status) {

            res.json(result.result)

        }else {

            res.json({err: result.err})

        }


    }

    async create(req,res) {

        var {name,email,password} = req.body

        if(name == '' || name == ' ' || name == undefined || name == null ) {

            res.json({err: "Nome Invalido Verifique e tente novamente"})

            return

        }

        if(email == '' || email == ' ' || email == undefined || email == null ) {

            res.json({err: "Email Invalido Verifique e tente novamente"})

            return

        }

        if(password == '' || password == ' ' || password == undefined || password == null ) {

            res.json({err: "Senha Invalido Verifique e tente novamente"})

            return

        }

        var result = await User.createUser(name,email,password)

        if(result.status){

            res.json({status: result.result})

        }else {


            res.json({err: result.err})

        }


    }

    async update(req,res) {

        var {email,name,newEmail,password} = req.body

        var result = await User.updateUser(email,name,newEmail,password)

        if(result.status) {

            res.json({status: result.result})

        }else {

            res.json({err: result.err})

        }

    }

    async delete(req,res) {

        var email = req.body.email

        var result = await User.deleteUser(email)

        if(result.status) {

            res.json({status: result.result})

        }else {

            res.json({err: result.err})

        }


    }



}


module.exports = new UserController()