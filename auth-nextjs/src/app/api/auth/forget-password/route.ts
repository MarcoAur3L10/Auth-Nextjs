import { EmailTemplate } from "@/components/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import User from "@/models/User";

import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend("re_e91gCyAT_LJ9kDDuoC4iQhPSPTDjKXoxW");

export async function POST(request: NextRequest) {
    try {
        
        const body: { email: string } = await request.json();
        const { email } = body;

        const userFind = await User.findUnique({ 
            where: { 
                email
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

        const tokenData = {
            email: userFind.email,
            userId: userFind.id
        };

        const token = jwt.sign({ data: tokenData }, 'secreto', {
            expiresIn: 86400,
        });

        const forgetUrl = `http://localhost:3000/change-password?token=${token}`;

        //@ts-ignore
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Cambio de contraseña",
            react: EmailTemplate({ buttonUrl: forgetUrl }),
        });

        return NextResponse.json(
            {
                message: messages.success.emailSent
            },
            {
                status: 200    
            }
        );

    } catch (error) {
        
        return NextResponse.json(
            {
                message: messages.error.default,
                error
            },
            {
                status: 500
            }
        );

    }
}