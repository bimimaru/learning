import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, } from "@nestjs/swagger";
import { BaseResponse } from "src/config/dto/base.response";

@Controller()
@ApiTags('Common')
export class CommonController {

    @Get("/")
    async ping(): Promise<boolean> {
        return true;
    }

    @Get("/fail")
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "Internal server error"
    })
    async pingFail(): Promise<boolean> {
        throw new Error("I dont know")
    }
}