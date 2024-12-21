export class APIResponse {
    status!: number;
    message!: string;
    success!: boolean;
    data?: any;

    constructor(success: boolean, status: number, message: string, data?: any) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
