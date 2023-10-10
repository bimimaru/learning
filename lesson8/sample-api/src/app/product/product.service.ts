import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";
import { v4 as uuidv4 } from 'uuid';
import { products as defaultProducts } from "../../data/products";
import { PRODUCT_EXCEPTION } from "./product.exception";
import { PaginationWithSoftDelete } from "../common/dto/pagination-with-soft-delete";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./update-product.dto";

@Injectable()
export class ProductService {

    private products = defaultProducts;

    async getProducts({
        limit,
        offset,
        softDelete
    }: PaginationWithSoftDelete): Promise<Product[]> {
        return this.products
            .filter(product => softDelete ? true : product.enabled !== false)
            .slice(offset, limit + offset);
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        if (this.products.find(product => product.name === createProductDTO.name)) {
            throw new BadRequestException(PRODUCT_EXCEPTION.EXIST);
        } else {
            const newProduct = {
                id: uuidv4(),
                ...createProductDTO,
            };
            this.products.push(newProduct);
            return newProduct;
        }
    }

    async updateProduct(id: string, updateProduct: UpdateProductDTO): Promise<Product> {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex >= 0) {
            const newProduct = {
                ...this.products[productIndex],
                ...updateProduct,
            }
            this.products[productIndex] = newProduct
            return newProduct
        } else {
            throw new NotFoundException(PRODUCT_EXCEPTION.NOT_FOUND);
        }
    }

    async deleteProduct(id: string): Promise<Product> {
        const product = this.products.find(product => product.id === id);

        if (product) {
            product.enabled = false;
        } else {
            throw new NotFoundException(PRODUCT_EXCEPTION.NOT_FOUND)
        }
        return
    }
}