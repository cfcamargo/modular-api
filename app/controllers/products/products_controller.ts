import { registerValidator, updateQuantity, updateValidator } from '#validators/product'
import { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)

    const products = await Product.query().paginate(page, perPage)

    return response.status(200).json({
      products,
    })
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator)
      const product = await Product.create(data)

      return response.status(201).json({
        product,
      })
    } catch (error) {
      return response.json({
        error,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const product = await Product.find(id)

    if (!product) {
      return response.status(404).send({
        message: 'Product Not Found',
      })
    }

    return response.status(200).json({
      product,
    })
  }

  async update({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const product = await Product.find(id)

    if (!product) {
      return response.status(404).send({
        message: 'Product Not Found',
      })
    }

    const data = await request.validateUsing(updateValidator)
    product.merge(data)
    await product.save()

    return response.status(200).json({
      product,
    })
  }

  async destroy({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const product = await Product.find(id)

    if (!product) {
      return response.status(404).send({
        message: 'Product Not Found',
      })
    }

    await product.delete()

    return response.status(200).send({
      message: 'Product Deleted Successfull',
    })
  }

  async updateQuantity({ request, response }: HttpContext) {
    const { id }: any = request.params()
    const product = await Product.find(id)
    const data = await request.validateUsing(updateQuantity)

    if (!product) {
      return response.status(404).send({
        message: 'Product Not Found',
      })
    }

    product.quantity = data.quantity
    await product.save()

    return response.status(200).send({
      message: 'Product Successfull Updated',
    })
  }
}
