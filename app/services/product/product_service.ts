import { inject } from "@adonisjs/core";
import ProductRepository from "../../repositories/product/productRepository.js";
import { ProductProps, UpdateProductProps } from "../../types/Product.js";

@inject()
export default class ProductService {
    constructor(protected productRepository: ProductRepository){}

    async index(page:number, perPage: number){
        return await this.productRepository.index(page, perPage)
    }

    async store(data: ProductProps){
        return await this.productRepository.store(data)
    }

    async update(data:UpdateProductProps, id:number){
        return await this.productRepository.update(data, id)
    }

    async destroy(id: number){
        return await this.productRepository.destroy(id)
    }

    async show(id: number){
        return await this.productRepository.show(id)
    }
}