import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface BodyProps {
    newPassword: string
    confirmPassword: string
}

export async function POST(request: NextRequest) {
    try {
        
        const body: BodyProps = await request.json();

        const { newPassword, confirmPassword } = body;

        //Validamos que esten todos los campos
        if (!newPassword || !confirmPassword) {
            return NextResponse.json(
                {
                    message: messages.error.needProps
                },
                {
                    status: 400
                }
            )
        };

        const headersList = headers();
        const token = headersList.get('token');

        if (!token) {
            return NextResponse.json(
                {
                    message: messages.error.notAuthorized
                },
                {
                    status: 400
                }
            )
        };

        try {

            const isTokenValid = jwt.verify(token, "secreto");
            
            //@ts-ignore
            const { data } = isTokenValid;

            const userFind = await User.findUnique({
                where: {
                    id: data.userId
                }
            });

            //Validar que exista el usuario
            if (!userFind) {
                return NextResponse.json(
                    {
                        message: messages.error.userNotFound
                    },
                    {
                        status: 400
                    }
                )
            };

            //Validamos que la nueva contraeña sea igual a la confirmación
            if (newPassword !== confirmPassword) {
                return NextResponse.json(
                    {
                        message: messages.error.passwordsNotMatch
                    },
                    {
                        status: 400
                    }
                )
            };

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            userFind.password = hashedPassword;

            await User.update({
                where: {
                    id: userFind.id
                },
                data: {
                    password: hashedPassword
                }
            })

            return NextResponse.json(
                {
                    message: messages.success.passwordChanged
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
