import { registerRestaurant } from "@/api/register-restaurant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

  const { mutateAsync: signUpRestaurant } = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: registerRestaurant,
  })

  async function onSignUp(data: SignUpForm) {
    try {
      await signUpRestaurant({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone
      });

      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        }
      })
    } catch (error) {
      toast.error("Não foi possível cadastrar o restaurante!")
    }


  }

  return (
    <>
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={"ghost"}>
          <Link to="/sign-in">
            Ja tem uma conta?
          </Link>
        </Button>

        <div className="w-[320px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e comece a vender suas pizzas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input id="restaurantName" type="text" {...register("restaurantName")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input id="managerName" type="text" {...register("managerName")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>



            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos
              <a href="#" className="font-semibold underline underline-offset-4"> Termos de serviço </a>
              e
              <a href="#" className="font-semibold underline underline-offset-4"> políticas de privacidade.</a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}