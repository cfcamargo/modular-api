import { AddressProps, updateAddressProps } from "./Address.js"
import { ContactProps, UpdateContactProps } from "./Contact.js"

export type ClientProps = {
    basicData : {
        name: string,
        document: number,
        rgIe: number,
        im: number | null,
    },
    contacts: ContactProps[],
    address: AddressProps
}

export type UpdateClientProps = {
    basicData: {
        name: string,
        document: number,
        rgIe: number,
        im: number | null,
    },
    contacts: UpdateContactProps[],
    address: updateAddressProps
}