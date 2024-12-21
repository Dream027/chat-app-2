import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "./APIResponse";

export function routeHandler(
    func: (
        req: NextRequest,
        params?: any
    ) => Promise<APIResponse | NextResponse>
) {
    return async (req: NextRequest, params?: any) => {
        try {
            const data = await func(req, params);
            if (data instanceof NextResponse) return data;

            return NextResponse.json(data);
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                success: false,
                status: 500,
                message: "Internal Server Error!",
            });
        }
    };
}
