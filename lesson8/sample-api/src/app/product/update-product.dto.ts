import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateProductDTO } from "./dto/create-product.dto";
import { Product } from "./product.entity";

export interface UpdateProductDTO {
    name: string;
    price: number;
    category: string;
}