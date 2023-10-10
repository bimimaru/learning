import { Type } from "class-transformer";
import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDTO {

    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    @MinLength(1)
    category: string;
}