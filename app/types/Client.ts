import { Address } from "./Address.js"
import { Contact } from "./Contact.js"

export type ClientProps = {
    name: string,
    document: number,
    rgIe: number,
    im: number | null,
    contacts: Contact[],
    address: Address
}