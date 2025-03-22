import vine from '@vinejs/vine'

export const clientDataValidator = vine.compile(
  vine.object({
    data: vine.object({
      fullName: vine.string().minLength(3),
      type: vine.string(),
      document: vine.number(),
      rgIe: vine.number(),
      im: vine.string().optional().nullable(),
      birthdate: vine.string().optional().nullable(),
      fantasyName: vine.string().optional().nullable(),
    }),
    address: vine
      .object({
        street: vine.string(),
        number: vine.string(),
        neighborhood: vine.string(),
        city: vine.string(),
        state: vine.string(),
        country: vine.string(),
        zipCode: vine.string(),
      })
      .nullable(),
    contacts: vine
      .array(
        vine.object({
          type: vine.string(),
          contact: vine.string(),
        })
      )
      .nullable(),
  })
)
