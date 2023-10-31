import { NextResponse, NextRequest } from "next/server";
import { messages } from "@/utils/messages";
import User from "@/models/User";

export async function GET(request: NextRequest) {
    try {
        
        const users = await User.findMany();

        return NextResponse.json(
            {
                users
            },
            {
                status: 200
            }
        );

    } catch (error) {

        return NextResponse.json(
            {
                message: messages.error.default, error
            },
            {
                status: 500
            }
        );

    }
}