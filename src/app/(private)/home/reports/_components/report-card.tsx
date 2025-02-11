import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Report } from "@/hooks"
import { Pencil } from "lucide-react"
import { ReportModal } from "./report-modal"
import { DeleteReport } from "./delete-report"
import { RenderPermission } from "../../_components"
import { useSession } from "next-auth/react"
import { PilotRank } from "@/shared/types"

export function ReportCard({ report }: { report: Report }) {
  const session = useSession();
  const currentUser = session.data?.user;
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center">
          <span className="font-mono text-xl text-muted-foreground mr-2">#{report.reportNumber}</span>
          {report.title}
        </CardTitle>
        <div className="flex space-x-2">
          <ReportModal report={report}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </ReportModal>
          <RenderPermission user={currentUser} role={PilotRank.SUB_COMMAND}>
            <DeleteReport report={report} />
          </RenderPermission>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between">
        <p className="flex-grow">
          <strong>Descrição:</strong> {report.description}
        </p>
        <div className="mt-8">
          <p>
            <strong>Oficiais Envolvidos:</strong>{" "}
            {report.officersEnvolved.map((officer) => officer.fullName).join(", ")}
          </p>
          <p>
            <strong>Criado em:</strong> {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

