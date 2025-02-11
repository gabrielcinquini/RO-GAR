"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { OfficersList } from "./_components"
import { OfficerModal } from "./_components/officer-modal"
import { RenderPermission } from "../_components"
import { useSession } from "next-auth/react"
import { PilotRank } from "@/shared/types"

export default function MembersPage() {
  const session = useSession()
  const currentUser = session.data?.user

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Membros</h1>
        <RenderPermission user={currentUser} role={PilotRank.SUB_COMMAND} >
          <OfficerModal>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Oficial
            </Button>
          </OfficerModal>
        </RenderPermission>
      </div>
      <OfficersList />
    </div>
  )
}

