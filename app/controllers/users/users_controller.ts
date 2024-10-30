// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import { registerValidator, updateValidator } from "#validators/user";
import { HttpContext } from "@adonisjs/core/http";

export default class UsersController {
    async index({ request }: HttpContext){
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)

        const users = await User.query().paginate(page, perPage)
        return{
            users
        }
    }

    async store({ request, response }: HttpContext){
        try {
            const data = await request.validateUsing(registerValidator);
            
            const user = await User.create(data);

            return response.status(201).json({
                user,
            });
        } catch (error) {
            return response.json({
                error
            })
        }
    }

    async show({ request, response }: HttpContext){
        const { id }: any = request.params()
        const user = await User.find(id)

        if(!user){
            return response.status(404).send({
                message: 'User Not Found'
            })
        }

        return {
            user
        }
    }

    async update({ request, response }: HttpContext){
        const { id }: any = request.params()
        const data = request.validateUsing(updateValidator)
        const user = await User.find(id)
        if(!user){
            return response.status(404).send({
                message: 'User Not Found'
            })
        }

        user.merge(data);
        await user.save();

        return response.status(200).send({
            user
        })

    }

    async destroy({ request, response }: HttpContext){
        const { id }: any = request.params()
        const user = await User.find(id)

        if(!user){
            return response.status(404).send({
                message: 'User Not Found'
            })
        }

        user.delete()
        return response.status(200).send('Usuário deletado com sucesso')
    }
}