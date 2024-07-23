import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ModelNotFoundException extends Exception {
  static status = 500

  async handle(error:this, ctx: HttpContext){
    return ctx.response.status(error.status).send({
      message: 'Model não encontrado', 
      code: error.status
    })
  }
}