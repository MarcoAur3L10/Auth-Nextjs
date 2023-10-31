'use client';
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useSearchParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from "axios";
import { Form } from "@/components/form";

export default function ChangePasswordPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const searchParams = useSearchParams()
  const authFetch = useAuthFetch();

  const changePassword = async (formData: any) => {
    startLoading();

    const token = searchParams.get('token');

    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    };

    await authFetch({
      endpoint: 'change-password',
      redirectRoute: '/',
      formData,
      options
    })
    finishLoading();
  }

  return (
    <>
      <Form 
        title="Cambia tu contraseña" 
        onSubmit={changePassword} 
        description="Formulario para cambiar tu contraseña"
      >
        <div className="my-[10px] flex flex-col gap-4">
          <Form.Input
            type="password"
            name="newPassword"
            label="contraseña"
            placeholder="Ingresa tu nueva contraseña..."
          />
          <Form.Input
            type="password"
            name="confirmPassword"
            label="confirmar contraseña"
            placeholder="Repite tu contraseña..."
          />
        </div>
        <Form.SubmitButton
          buttonText="Cambiar Contraseña"
          isLoading={isLoading}
        />
      </Form>
    </>
  )
}
