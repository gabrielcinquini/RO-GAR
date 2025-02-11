'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Report, useCreateReport, useOfficers, useUpdateReport } from "@/hooks";
import { ReportFormType, reportForm } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

type ReportModalProps = {
  report?: Report;
};

export function ReportModalForm({ report }: ReportModalProps) {
  const form = useForm<ReportFormType>({
    resolver: zodResolver(reportForm),
    defaultValues: {
      reportNumber: report?.reportNumber ? report.reportNumber : undefined,
      title: report?.title ? report.title : "",
      description: report?.description ? report.description : "",
      selectInvolvedOfficer: "",
      officersEnvolved: report?.officersEnvolved ? report.officersEnvolved : [],
    },
  });

  const session = useSession();
  const sessionData = session.data;

  const { mutateAsync: onCreateReport, isPending: isPendingCreateReport } = useCreateReport(sessionData);
  const { mutateAsync: onUpdateReport, isPending: isPendingUpdateReport } = useUpdateReport(sessionData);
  const { data: officers, isLoading } = useOfficers({ currentPage: undefined, itemsPerPage: undefined });

  const isPending = isPendingCreateReport || isPendingUpdateReport;

  const officersEnvolved = form.watch("officersEnvolved");

  const handleAddOfficer = () => {
    const selecteOfficerId = form.getValues("selectInvolvedOfficer");
    const selectedOfficer = officers?.data.find(officer => officer.id === selecteOfficerId);
  
    if (selectedOfficer && !officersEnvolved.some(o => o.id === selectedOfficer.id)) {
      const newOfficers = [...officersEnvolved, { id: selectedOfficer.id, fullName: selectedOfficer.fullName }];
      form.setValue("officersEnvolved", newOfficers, { shouldValidate: true });
    }
  };

  const handleRemoveOfficer = (officerId: string) => {
    const newOfficers = officersEnvolved.filter((officer) => officer.id !== officerId);
    form.setValue("officersEnvolved", newOfficers, { shouldValidate: true });
  };

  const handleSubmitReport = form.handleSubmit(async (data) => {
    const currentReportNumber = form.formState.defaultValues?.reportNumber;
    if(report) return await onUpdateReport({ currentReportNumber, report: data });

    return await onCreateReport(data);
  });

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmitReport}>
        <FormField
          control={form.control}
          name="reportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. (8224)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Insira o título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Insira a descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Oficiais envolvidos</FormLabel>
          <div className="flex gap-4">
            {isLoading ? <Skeleton className="w-full h-10" /> : (
              <>
                <Select onValueChange={(value) => form.setValue("selectInvolvedOfficer", value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um oficial" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {officers?.data.map(officer => 
                      <SelectItem key={officer.id} value={officer.id}>{officer.fullName}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <Button type="button" variant="secondary" onClick={handleAddOfficer}>
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="officersEnvolved"
          render={() => (
            <FormItem>
              <div className="flex gap-2">
                {officersEnvolved.map((officer) => (
                  <Badge key={officer.id} variant="secondary" className="flex items-center gap-2 p-2">
                    {officer.fullName}
                    <button type="button" onClick={() => handleRemoveOfficer(officer.id)}>
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-10 w-full max-sm:text-sm flex gap-2" type="submit" disabled={form.formState.isSubmitting}>
          {isPending && <Loader />}
          {report ? 'Atualizar Relatório' : 'Criar Relatório'}
        </Button>
      </form>
    </Form>
  );
}

