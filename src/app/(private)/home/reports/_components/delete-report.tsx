import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter, DialogTrigger, Dialog, DialogTitle, DialogDescription, DialogContent } from '@/components/ui/dialog'
import { Report, useDeleteReport } from '@/hooks'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function DeleteReport({ report }: { report: Report }) {
  const session = useSession()

  const { mutate: onDeleteReport, isPending } = useDeleteReport(session.data)

  const handleDeleteReport = (reportNumber: number) => {
    onDeleteReport(reportNumber)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar R.O</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja deletar esse R.O? Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Número do R.O:</strong> {report.reportNumber}
          </p>
          <p>
            <strong>Título:</strong> {report.title}
          </p>
          <p>
            <strong>Descrição:</strong> {report.description}
          </p>
          <p>
            <strong>Oficiais Envolvidos:</strong>{" "}
            {report.officersEnvolved.map((officer) => officer.fullName).join(", ")}
          </p>
          <p>
            <strong>Criado em:</strong> {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="destructive" className="w-full" onClick={() => handleDeleteReport(report.reportNumber)} disabled={isPending}>
            {isPending && <Loader />}
            Deletar R.O
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
