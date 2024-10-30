import vine from '@vinejs/vine'

export const registerValidator  = vine.compile(
    vine.object({
        name: vine.string().minLength(3),
        brand: vine.string().minLength(2),
        quantity: vine.number().min(0),
        price: vine.number().min(0)
    })
)


export const updateValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3),
        brand: vine.string().minLength(2),
        quantity: vine.number(),
        price: vine.number().min(0)
    })
)

export const updateQuantity = vine.compile(
    vine.object({
        quantity: vine.number()
    })
)