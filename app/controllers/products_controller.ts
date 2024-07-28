import ProductService from '#services/product/product_service';
import { createProductValidator, updateProductValidator } from '#validators/product';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(protected productService: ProductService){
    // metodo magico
    // chamado sempre que chamar um metodo da classe
  }

  async index({request}: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)

    return await this.productService.index(page, perPage)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)
    return await this.productService.store(data)
  }

  async show({ params }: HttpContext) {
    return await this.productService.show(params.id)
  }

  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateProductValidator)
    const updated = await this.productService.update(data, data.id)
    return updated
  }

  async destroy({ params }: HttpContext) {
    await this.productService.destroy(params.id)
  }
}