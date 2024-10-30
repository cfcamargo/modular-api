import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'database.unique' : 'Esse email ja esta sendo utilizado por outro usuário',
  'minLength': 'O campo {{ field }} precisa conter pelo menos {{ min }} caracteres',
  'required': 'O campo {{ field }} é obrigatório',
})


const password = vine.string().minLength(6)

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(8),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    role: vine.enum(['ADMIN', 'DEFAULT']),
    password,
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)

export const updateValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(8),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
    }),
    role: vine.enum(['ADMIN', 'DEFAULT']),
  })
)