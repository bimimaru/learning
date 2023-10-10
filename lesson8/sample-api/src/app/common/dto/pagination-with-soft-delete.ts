import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { Pagination } from "./pagination";
import { Transform, Type } from "class-transformer";

export class PaginationWithSoftDelete extends Pagination {

    @ApiPropertyOptional({
        default: false,
        description: "Get resources that already deleted"
    })
    @IsBoolean()
    @IsOptional()
    @Transform((value) => value.value === 'true')
    softDelete: boolean = false;
}