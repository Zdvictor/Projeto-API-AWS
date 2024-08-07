const prismaClient = require("../src/prisma/index")
const bcrypt = require("bcrypt")

class User {

    async getAll(){

        try {

            var result = await prismaClient.user.findMany()

            if(result.length > 0) {

                return {status: true, result}

            }else {

                return {status: false, err: "Nao Existe Usuario Cadastrados"}

            }


            

        }catch(err) {

            console.log(err)
            return {status: false, err: "Ops Problema no Servidor"}

        }


    }

    async getById(id){        

        try {
     
            var result = await prismaClient.user.findUnique({

                where: {

                    id
                }
                
            })


            return {status: true, result}


        }catch(err) {

            console.log(err)
            return {status: false, err: "Ops Problema no Servidor"}


        }



    }

    async getByEmail(email) {

        try {

            var result = await prismaClient.user.findUnique({

                where: {
    
                    email
    
                }
    
            })
    
            if(result != undefined) {

                return true

            }else {

                return false

            }

        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema no Servidor"}

        }


    }

    async createUser(name,email,password) {

        try {
         
            var emailExist = await this.getByEmail(email)

            if(emailExist) {

                return {status: false, err: "O Email Ja Existe"}

            }

            var hash = await bcrypt.hash(password, 10)

            var user = await prismaClient.user.create({
                
                data: {

                    name,
                    email,
                    password: hash

                }     

        })

        return {status: true, result: "Usuario Criado com Sucesso"}



    } catch(err) {

            console.log(err)
            return {status: false, err: "Problema no Servidor"}

        }

    }

    async updateUser(email,name,newEmail,password) {

        try {

            var emailExist = await this.getByEmail(email)

            if(!emailExist) {
    
                return {status: false, err: "Nao Existe esse Email"}
    
            }
    
            var hash = await bcrypt.hash(password, 10)
            var result = await prismaClient.user.update({
    
                where: {
    
                    email
    
                },
    
                data: {
    
                    name,
                    email: newEmail,
                    password: hash
    
    
                }
    
            })

            return {status: true, result: "Atualizado com Sucesso"}

        }catch(err) {

            
            console.log(err)
            return {status: false, err: "Problema no Servidor"}


        }

    }

    async deleteUser(email) {

        try {

            var emailExist = await this.getByEmail(email)

            if(!emailExist) {
    
                return {status: false, err: "O Email Nao Existe"}
    
            }
    
            var result = await prismaClient.user.delete({
    
                where: {
    
                    email
    
                }
    
            })

            return {status: true, result: "Apagado com Sucesso"}

        }catch(err) {

            console.log(err)
            return {status: false, err: "Problema no Servidor"}

        }

    }

}


module.exports = new User()