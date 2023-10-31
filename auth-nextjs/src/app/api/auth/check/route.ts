import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { messages } from "@/utils/messages";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        const headersList = headers();
        const token = headersList.get('token');

        // Valida que haya token
        if (!token) {
            return NextResponse.json(
                {
                    message: messages.error.notAuthorized
                },
                {
                    status: 400
                }
            );
        }

        try {
            const isTokenValid = jwt.verify(token, 'secreto');
            //@ts-ignore
            const { data } = isTokenValid;

            const userFind = await User.findUnique({
                where: {
                    id: data.id,
                },
            });

            // Verifica que exista el usuario
            if (!userFind) {
                return NextResponse.json(
                    {
                        message: messages.error.userNotFound
                    },
                    {
                        status: 400
                    }
                );
            }

            return NextResponse.json(
                {
                    isAuthorized: true,
                    message: messages.success.authorized
                },
                {
                    status: 200
                }
            );

        } catch (error) {
            return NextResponse.json(
                {
                    message: messages.error.tokenNotValid, error
                },
                {
                    status: 400
                }
            );
        }

    } catch (error) {
        return NextResponse.json(
            {
                message: messages.error.default, error
            },
            {
                status: 400
            }
        );
    }
}
