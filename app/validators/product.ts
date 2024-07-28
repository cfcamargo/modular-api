import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(3),
        brand: vine.string().trim().minLength(2),
        quantity: vine.number(),
        price: vine.number().min(0)
    })
)

export const updateProductValidator = vine.compile(
    vine.object({
        id: vine.number(),
        name: vine.string().trim().minLength(3),
        brand: vine.string().trim().minLength(2),
        quantity: vine.number(),
        price: vine.number().min(0)
    })
)