import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    basicData: vine.object({
      name: vine.string().trim().minLength(8),
      document: vine.number().unique(async (db, value) => {
          const match = await db.from('clients').select('document').where('document', value).first()
          return !match
      }),
      rgIe: vine.number().unique(async (db, value) => {
        const match = await db.from('clients').select('rg_ie').where('rg_ie', value).first()
        return !match
      }),
      im: vine.number().unique(async (db, value) => {
        const match = await db.from('clients').select('im').where('im', value).first()
        return !match
      }).nullable(),
    }),
    contacts: vine.array(vine.object({
      type:vine.enum(['email', 'phone']),
      contact: vine.string()
    })),
    address: vine.object({
      street: vine.string(),
      number: vine.string(),
      neighborhood: vine.string(),
      city: vine.string(),
      state: vine.string(),
      country: vine.string()
    })
  })
)

export const updateClientValidator = vine.compile(
  vine.object({
    basicData: vine.object({
      name: vine.string().trim().minLength(8).optional(),
      document: vine.number().optional(),
      rgIe: vine.number().optional(),
      im: vine.number().optional(),
    }).optional(),
    contacts: vine.array(vine.object({
      type:vine.enum(['email', 'phone']).optional(),
      contact: vine.string().optional()
    })).optional(),
    address: vine.object({
      street: vine.string().optional(),
      number: vine.string().optional(),
      neighborhood: vine.string(),
      city: vine.string().optional(),
      state: vine.string().optional(),
      country: vine.string().optional()
    }).optional()
  })
)


