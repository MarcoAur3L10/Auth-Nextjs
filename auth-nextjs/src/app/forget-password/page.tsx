'use client';
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { Form } from "@/components/form";

export default function ForgetPasswordPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const forgetPassword = async (formData: any) => {
    startLoading();
    await authFetch({
      endpoint: 'forget-password',
      formData
    })
    finishLoading();
  }

  return (
    <>
      <Form 
        title="Recuperar contraseña" 
        onSubmit={forgetPassword} 
        description="Formulario para recuperar tu contraseña"
      >
        <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          type="text"
          name="email"
          label="correo"
          placeholder="Ingresa tu correo..."
        />
        </div>
        <Form.SubmitButton
          buttonText="Recuperar Contraseña"
          isLoading={isLoading}
        />
        <Form.Footer 
          description="Volver al inicio"
          link="/"
          textLink="Inicio"
        />
      </Form>
    </>
  )
}
