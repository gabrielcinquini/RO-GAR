import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Officer } from '@/hooks'
import { Pencil } from 'lucide-react'
import React from 'react'
import { OfficerModal } from './officer-modal'
import { DeleteOfficer } from './delete-officer'
import { RenderPermission } from '../../_components'
import { useSession } from 'next-auth/react'
import { PilotRank, pilotRankTranslations } from '@/shared/types'

export function OfficerCard({ officer }: { officer: Officer }) {
  const session = useSession();
  const currentUser = session.data?.user;

  return (
    <Card key={officer.id}>
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          <div className='flex flex-col'>
            <span>{officer.fullName}</span>
            <span className="font-mono text-muted-foreground">{pilotRankTranslations[officer.internalRole]}</span>
          </div>
        </CardTitle>
        <div className='flex items-center gap-2'>
          <RenderPermission user={currentUser} role={PilotRank.SUB_COMMAND} officerPhone={officer.phone} >
            <OfficerModal officer={officer}>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </OfficerModal>
          </RenderPermission>
          <RenderPermission user={currentUser} role={PilotRank.SUB_COMMAND}>
            <DeleteOfficer officer={officer} />
          </RenderPermission>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Telefone:</strong> {officer.phone}
        </p>
        {officer.lastReport ? (
          <>
            <p>
              <strong>Último R.O:</strong> <span className="font-mono text-muted-foreground">#{officer.lastReport.reportNumber}</span> {officer.lastReport.title}
            </p>
            <p>
              <strong>Data:</strong> {new Date(officer.lastReport.createdAt).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p>Nenhum R.O encontrado</p>
        )}
        <p className='mt-6'>
          <strong>Ingressou em:</strong> {new Date(officer.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}
