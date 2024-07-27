import ModelNotFoundException from "#exceptions/model_not_found_exception";
import Address from "#models/address";
import { AddressProps } from "../../types/Address.js";

export default class addressRepository {
    async store(data: AddressProps, id: number){
        return await Address.create({clientId: id, ...data})
    }

    async update(data: any, id:number){
        const address =  await Address.query().where('client_id', id).first()
        if(!address){
            throw new ModelNotFoundException()
        }
        address.merge(data.basicData)
        address.save()
        return address
    }
}