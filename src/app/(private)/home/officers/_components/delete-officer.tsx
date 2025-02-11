import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter, DialogTrigger, Dialog, DialogTitle, DialogDescription, DialogContent } from '@/components/ui/dialog'
import { Officer, useDeleteOfficer } from '@/hooks'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function DeleteOfficer({ officer }: { officer: Officer }) {
  const session = useSession()

  const { mutate: onDeleteOfficer, isPending } = useDeleteOfficer(session.data)

  const handleDeleteOfficer = (officerPhoneNumber: string) => {
    onDeleteOfficer(officerPhoneNumber)
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
          <DialogTitle>Remover Oficial</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja remover esse Oficial? Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Oficial:</strong> {officer.fullName}
          </p>
          <p>
            <strong>Cargo Interno:</strong> {officer.internalRole}
          </p>
          <p>
            <strong>Número do telefone:</strong> {officer.phone}
          </p>
          <p>
            <strong>Ingressou em:</strong> {new Date(officer.createdAt).toLocaleDateString()}
          </p>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="destructive" className="w-full" onClick={() => handleDeleteOfficer(officer.phone)} disabled={isPending}>
            {isPending && <Loader />}
            Remover Oficial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
