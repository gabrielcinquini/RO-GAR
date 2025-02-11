import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ModeToggle from "@/components/ui/mode-toggle";
import { Typography } from "@/components/ui/typography";
import { SignInForm } from "./_components/SingInForm";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center max-sm:container">
      <div className="absolute top-12">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold max-sm:text-xl">
            Entrar
          </CardTitle>
          <CardDescription>
            Insira o usuário e a senha abaixo para entrar
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-2">
          <SignInForm />
        </CardContent>

        <CardFooter className="flex-col text-center">
          <Typography variant="small">Não possui uma conta? Contate seu COMANDO ou SUBCOMANDO</Typography>
        </CardFooter>
      </Card>
    </div>
  )
}
