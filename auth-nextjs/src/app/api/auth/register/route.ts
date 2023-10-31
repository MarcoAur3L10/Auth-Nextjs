import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/utils/isValidEmial";
import { messages } from "@/utils/messages";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { email, password, confirmPassword } = body;
        
        //Validar que esten todos los datos enviados
        if (!email || !password || !confirmPassword) {
            return NextResponse.json(
                {
                    message: messages.error.needProps,
                },
                {
                    status: 400,
                }
            )
        };

        //Validar si es un email
        if (!isValidEmail(email)) {
            return NextResponse.json(
                {
                    message: messages.error.emailNotValid,
                },
                {
                    status: 400,
                }
            )
        };

        //Validar que las contraseñas sean iguales
        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    message: messages.error.passwordsNotMatch,
                },
                {
                    status: 400,
                }
            )
        };

        //Validar que ya existe un usuario con ese email
        const userFind = await User.findUnique({ 
            where: { 
                email
            }
        });

        if (userFind) {
            return NextResponse.json(
                {
                    message: messages.error.emailExist,
                },
                {
                    status: 400,
                }
            )
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // @ts-ignore
        const { password: userPass, ...rest } = newUser;
        
        const token = jwt.sign({ data: rest }, 'secreto', {
            expiresIn: 86400,
        });

        const response = NextResponse.json(
            {
                newUser: rest,
                message: messages.success.userCreated,
            },
            {
                status: 200,
            }
        );

        response.cookies.set('auth_cookie', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
        });

        return response;

    } catch (error) {
        
        return NextResponse.json(
            {
                message: messages.error.default, 
                error
            },
            {
                status: 500
            }
        )

    }
}