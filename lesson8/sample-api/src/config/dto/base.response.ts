export class BaseResponse<T>{
    success: boolean;
    message?: string;
    data?: T;

    constructor(success: boolean, message?: string, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T>(data?: T): BaseResponse<T> {
        return new BaseResponse(true, null, data);
    }

    static failure<T>(message?: string): BaseResponse<T> {
        return new BaseResponse(true, message, null);
    }
}