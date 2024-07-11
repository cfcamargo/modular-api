import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
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
  })
)


export const updateValidator = vine.compile(
  vine.object({
    
  })
)
