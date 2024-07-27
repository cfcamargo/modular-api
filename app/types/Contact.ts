export type ContactProps = {
    type: "email" | "phone"
    contact: string
}

export type UpdateContactProps = {
    id: number
    type: "email" | "phone"
    contact: string
}