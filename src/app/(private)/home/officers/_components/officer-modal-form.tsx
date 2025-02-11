'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Officer, useCreateOfficer, useUpdateOfficer } from "@/hooks";
import { PilotRank, pilotRankTranslations } from "@/shared/types";
import { SignUpFormType, signUpForm } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { RenderPermission } from "../../_components";

type ReportModalProps = {
  officer?: Officer;
  onClose: () => void;
};

export function CreateOfficerModalForm({ officer, onClose }: ReportModalProps) {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      firstName: officer?.fullName ? officer.fullName.split(" ")[0] : "",
      lastName: officer?.fullName ? officer.fullName.split(" ")[1] : "",
      phone: officer?.phone ? officer.phone : "",
      internalRole: officer?.internalRole ? officer.internalRole : undefined,
    },
  });

  const session = useSession();
  const currentOfficer = session.data?.user;

  const { mutateAsync: onCreateOfficer, isPending: isPendingCreateOfficer } = useCreateOfficer(session.data);
  const { mutateAsync: onUpdateOfficer, isPending: isPendingUpdateReport } = useUpdateOfficer(session.data);

  const isPending = isPendingCreateOfficer || isPendingUpdateReport;

  const handleSubmitOfficer = form.handleSubmit(async (data) => {
    const currentOfficerPhone = form.formState.defaultValues?.phone;

    if(officer) {
      await onUpdateOfficer({ currentOfficerPhone, officer: data });
    } else {
      await onCreateOfficer(data);
    }

    onClose();
  });

  const isCurrentUserEditingItSelf = officer && officer.phone === session.data?.user?.phone;
  const shouldShowPasswordFields = !officer || isCurrentUserEditingItSelf;

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmitOfficer}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="e.g. (123-123)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <RenderPermission user={currentOfficer} role={PilotRank.SUB_COMMAND} >
          <FormField
            control={form.control}
            name="internalRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo Interno</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cargo interno" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(PilotRank).map(rank => (
                      <SelectItem key={rank} value={rank}>{pilotRankTranslations[rank]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </RenderPermission>

        {shouldShowPasswordFields &&  (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme sua senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button className="mt-10 w-full max-sm:text-sm flex gap-2" type="submit" disabled={form.formState.isSubmitting}>
          {isPending && <Loader />}
          {officer ? 'Atualizar Oficial' : 'Cadastrar Oficial'}
        </Button>
      </form>
    </Form>
  );
}

