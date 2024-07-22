import Client from "#models/client";
import { ClientProps } from "../../types/Client.js";

export default class clientRepository {
    async store(data: ClientProps){
        return await Client.create(data)
    }

    async index(page:number, perPage: number){
        return await Client.query().paginate(page, perPage)
    }

    async show(id: number) {
        return await Client.findByOrFail('id', id)
    }

    async update(data: ClientProps, id:number){
        return await Client.query().where('id', id).update(data)
    }
}