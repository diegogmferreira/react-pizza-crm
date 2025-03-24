import { Link, useRouteError } from "react-router";

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Ooops, algo deu errado!</h1>
      <p className="text-sm text-muted-foreground">Um erro aconteceu ao tentar acessar a página solicitada.</p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground mt-8">
        Voltar para o <Link to="/" className="text-sky-500 dark:text-sky-400">Dashboard</Link>
      </p>
    </div>
  )
}