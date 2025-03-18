import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { z } from "zod"

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<SignInForm>()

  async function onSignIn(data: SignInForm) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <>
      <Helmet title="Sign In" />
      <div className="p-8">
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
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}