import { signIn } from "@/api/sign-in"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useSearchParams } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? ""
    }
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: signIn,
  })

  async function onSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email });

      toast.success("Enviamos um link de autenticação para seu e-mail!", {
        action: {
          label: 'Reenviar',
          onClick: () => onSignIn(data),
        }
      })
    } catch (error) {
      toast.error("Não foi possível autenticar!")
    }
  }

  return (
    <>
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={"ghost"}>
          <Link to="/sign-up">
            Novo estabelecimento?
          </Link>
        </Button>

        <div className="w-[320px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input id="email" type="email" placeholder="email@exemplo.com" {...register("email")} />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}