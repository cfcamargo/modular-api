import ModelNotFoundException from "#exceptions/model_not_found_exception";
import Product from "#models/product";
import { ProductProps, UpdateProductProps } from "../../types/Product.js";

export default class ProductRepository {
    async index(page:number, perPage: number) {
        return await Product.query().paginate(page, perPage)
    }

    async store(data: ProductProps) {
        const product = await Product.create(data)
        return product
    }

    async show(id: number) {
        return await Product.findByOrFail('id', id)
    }

    async update(data: UpdateProductProps, id: number){
        const product = await Product.find(id)

        if(!product){
            throw new ModelNotFoundException()
        }

        product.merge(data)
        await product.save()

        return product
    }

    async destroy(id: number) {
        const product = await Product.find(id)
        if(!product){
            throw new ModelNotFoundException()
        }
        product.delete()
        return true
    }
}