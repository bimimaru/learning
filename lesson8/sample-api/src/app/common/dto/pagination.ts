import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsInt, Min, IsOptional, IsBoolean } from "class-validator";


export class Pagination {

    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional({
        minimum: 0,
        default: 5
    })
    readonly limit: number = 5;

    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional({
        minimum: 0,
        default: 0,
    })
    readonly offset: number = 0;
}