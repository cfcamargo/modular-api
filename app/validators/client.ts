import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
    vine.object({
        data: vine.object({
            fullName: vine.string().minLength(3),
            type: vine.string(),
            document:vine.number(),
            rgIe: vine.number(),
            im: vine.string().nullable(),
            fantasyName: vine.string().nullable(),
        }),
        address : vine.object({
            street: vine.string(),
            number: vine.string(),
            neighborhood: vine.string(),
            city: vine.string(),
            state: vine.string(),
            country: vine.string()
        }).nullable(),
        contacts: vine.array(
            vine.object({
                type: vine.string(),
                contact: vine.string()
            })
        ).nullable()
    })
)

export const updateClientData = vine.compile(
    vine.object({
        fullName: vine.string().minLength(3),
        type: vine.string(),
        document:vine.number(),
        rgIe: vine.number(),
        im: vine.string().nullable(),
        fantasyName: vine.string().nullable(),
    })

)

export const updateClientAddress = vine.compile(
    vine.object({
        street: vine.string(),
        number: vine.string(),
        neighborhood: vine.string(),
        city: vine.string(),
        state: vine.string(),
        country: vine.string(),
    })
)

export const updateClientContact = vine.compile(
  vine.object({
    type: vine.string(),
    contact: vine.string()
  })
)
