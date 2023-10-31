'use client';
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { Form } from "@/components/form";

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();

  const login = async (formData: any) => {
    startLoading();
    await authFetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })
    finishLoading();
  }

  return (
    <>
      <Form 
        title="Inicia Sesión" 
        onSubmit={login} 
        description="Formulario para iniciar sesión"
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
        </div>
        <Form.SubmitButton
          buttonText="Iniciar Sesión"
          isLoading={isLoading}
        />
        <Form.Footer 
          description="Te olvidaste tu contraseña?"
          link="/forget-password"
          textLink="Recuperar contraseña"
        />
        <Form.Footer 
          description="Aun no tienes cuenta?"
          link="/register"
          textLink="Registrate"
        />
      </Form>
    </>
  )
}
