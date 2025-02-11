"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReportModalForm } from "./report-modal-form"
import { Report } from "@/hooks"

type ReportModalProps = {
  report?: Report
  children: React.ReactNode
}

export function ReportModal({ report, children }: ReportModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{report ? "Edit Report" : "Add New Report"}</DialogTitle>
        </DialogHeader>
        <ReportModalForm report={report} />
      </DialogContent>
    </Dialog>
  )
}

