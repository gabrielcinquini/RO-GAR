'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOfficers, useReports } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FilterReportType, filterReportSchema } from "@/validations"
import ReportList from "./report-list"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

type Filters = {
  reportNumber?: string
  officerId: string
}

export default function FilterForm() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: officers } = useOfficers({ currentPage: undefined, itemsPerPage: undefined })

  const itemsPerPage = 4

  const form = useForm<FilterReportType>({
    resolver: zodResolver(filterReportSchema),
    defaultValues: {
      officerId: 'all',
    },
  })

  const [filters, setFilters] = useState<Filters>({
    officerId: 'all',
  })

  const { data: reports, isLoading } = useReports({ currentPage, itemsPerPage, reportNumber: filters.reportNumber, officerId: filters.officerId })

  const handleFilterReports = form.handleSubmit(async (data) => {
    setFilters({
      reportNumber: data.reportNumber || undefined,
      officerId: data.officerId || 'all',
    })
    setCurrentPage(1)
  })

  const handleClear = () => {
    setFilters({
      reportNumber: undefined,
      officerId: 'all',
    })
    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleFilterReports} className="mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField 
              control={form.control} 
              name="reportNumber" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reportNumber">Número do R.O</FormLabel>
                  <FormControl>
                    <Input
                      id="reportId"
                      placeholder="Insira o número do R.O"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control} 
              name="officerId" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="officerId">Oficiais Envolvidos</FormLabel>
                  {isLoading ? <Skeleton className="w-full h-10" /> : (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger id="officerId">
                          <SelectValue placeholder="Select an officer" />
                        </SelectTrigger>
                      </FormControl>
                        <SelectContent>
                          <SelectItem value="all">Todos Oficiais</SelectItem>
                          {officers?.data.map((officer) => (
                            <SelectItem key={officer.id} value={officer.id}>
                              {officer.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit">Aplicar Filtros</Button>
            <Button type="button" variant="outline" onClick={handleClear}>
              Limpar Filtros
            </Button>
          </div>
        </form>

      </Form>
      {isLoading ? Array.from({length: 3}).map((_, idx) => 
        <Skeleton key={idx} className="w-full h-32" />
      ) : 
        <ReportList
          reports={reports?.data} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          itemsPerPage={itemsPerPage} 
          totalPages={reports?.totalPages} 
          totalCount={reports?.totalCount}
        />
      }
    </>
  )
}
