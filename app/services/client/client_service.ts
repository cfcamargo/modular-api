import { inject } from "@adonisjs/core";
import clientRepository from "../../repositories/client/clientRepository.js";
import { ClientProps } from "../../types/Client.js";

@inject()
export default class ClientService {
    constructor(protected clientRepository: clientRepository){}

    async store(data: ClientProps){
        return await this.clientRepository.store(data)
    }

    async index(page:number, perPage: number){
        return await this.clientRepository.index(page, perPage)
    }
} 