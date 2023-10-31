'use client';
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { Form } from "@/components/form";

export default function RegisterPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const register = async (formData: any) => {
    startLoading();
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData
    })
    finishLoading();
  }

  return (
    <>
      <Form 
        title="Registrate" 
        onSubmit={register} 
        description="Formulario para crear una cuenta"
      >
        <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          type="text"
          name="email"
          label="correo"
          placeholder="Ingresa tu correo..."
        />
        <Form.Input
          type="password"
          name="password"
          label="contraseña"
          placeholder="Ingresa tu contraseña..."
        />
        <Form.Input
          type="password"
          name="confirmPassword"
          label="contraseña"
          placeholder="Repite tu contraseña..."
        />
        </div>
        <Form.SubmitButton
          buttonText="Crear Cuenta"
          isLoading={isLoading}
        />
        <Form.Footer 
          description="Ya tienes cuenta?"
          link="/"
          textLink="Inicia Sesión"
        />
      </Form>
    </>
  )
}
