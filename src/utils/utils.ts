import { QueryClient } from "@tanstack/react-query"

export const revalidateQueryKey = (
  paths: string[],
  queryClient: QueryClient,
) => {
  paths.map((p) => queryClient.invalidateQueries({ queryKey: [p] }))
}
