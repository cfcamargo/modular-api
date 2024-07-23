import ModelNotFoundException from "#exceptions/model_not_found_exception";
import Address from "#models/address";
import Contact from "#models/contact";
import { ContactProps } from "../../types/Contact.js";

export default class contactRepository {
    async store(data: ContactProps[], id: number): Promise<Contact[]> {
        const contacts = await Promise.all(data.map(async (contact) => {
            const response = await Contact.create({ clientId: id, ...contact });
            return response;
        }));
        return contacts;
    }

    async update(data: any, id:number){
        const address =  await Address.query().where('user_id', id).first()
        if(!address){
            throw new ModelNotFoundException()
        }
        address.merge(data.basicData)
        address.save()
        return address
    }
}