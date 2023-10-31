import * as React from "react";

interface EmailTemplateProps {
    buttonUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    buttonUrl
}) => (
    <div className="p-20px bg-white grid justify-items-center">
        <span className="text-center">
            Haz click acá para cambiar de contraseña 👇
        </span>
        <a href={buttonUrl} className="m-10px m-auto">
            <button>Cambiar contraseña</button>
        </a>
    </div>
)