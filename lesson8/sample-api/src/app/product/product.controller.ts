import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { Product } from "./product.entity";
import { ApiBadRequestResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { Pagination } from "../common/dto/pagination";
import { BaseResponse } from "src/config/dto/base.response";
import { PRODUCT_EXCEPTION } from "./product.exception";
import { PaginationWithSoftDelete } from "../common/dto/pagination-with-soft-delete";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./update-product.dto";

@Controller("/products")
@ApiTags("Products")
export class ProductController {

    constructor(private readonly productService: ProductService) {

    }

    @Get("/")
    @ApiOperation({
        description: "Get Products"
    })
    async getProducts(@Query() pagination: PaginationWithSoftDelete): Promise<Product[]> {
        console.log(pagination)
        return this.productService.getProducts(pagination);
    }

    @Post("/")
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({
        description: "Create product",
    })
    @ApiOkResponse({
        description: "Create product success",
    })
    @ApiBadRequestResponse({
        description: "Product already exist"
    })
    async createProduct(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
        return this.productService.createProduct(createProductDTO);
    }

    @Put("/:id")
    @ApiNotFoundResponse({
        description: "Product not found",
    })
    @ApiOkResponse({
        description: "Update product success"
    })
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDTO: UpdateProductDTO): Promise<Product> {
        return this.productService.updateProduct(id, updateProductDTO)
    }

    @Delete("/:id")
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Product not found",
        schema: {
            example: BaseResponse.failure(PRODUCT_EXCEPTION.NOT_FOUND)
        }
    })
    async deleteProducts(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}