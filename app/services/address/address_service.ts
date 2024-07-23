import addressRepository from "../../repositories/address/addressRepository.js";
import { inject } from "@adonisjs/core";
import { AddressProps } from "../../types/Address.js";

@inject()
export default class AddressService {
    constructor(protected addressRepository: addressRepository){}
    
    async store(data: AddressProps, id: number){
        const address = await this.addressRepository.store(data, id)
        return address
    }

    async update(data: any, id:number){
        const address = await this.addressRepository.update(data, id)
        return address
    }
} 