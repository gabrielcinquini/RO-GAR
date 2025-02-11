"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Officer } from "@/hooks"
import { CreateOfficerModalForm } from "./officer-modal-form"

type ReportModalProps = {
  officer?: Officer
  children: React.ReactNode
}

export function OfficerModal({ officer, children }: ReportModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{officer ? "Editar Oficial" : "Adicionar Oficial"}</DialogTitle>
        </DialogHeader>
        <CreateOfficerModalForm officer={officer} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}