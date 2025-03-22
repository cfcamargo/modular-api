import Mail from '@adonisjs/mail/services/main'

async function sendRegisterEmail(email: string, code: string) {
  await Mail.send((message) => {
    message
      .to(email)
      .from('no-reply@modular.com')
      .subject('Complete Seu Cadastro no Modular')
      .htmlView('emails/register', {
        code,
      })
  })
}

export default sendRegisterEmail
