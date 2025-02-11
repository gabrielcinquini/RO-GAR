export const QUERY_KEYS = {
  GET: {
    OFFICERS: (currentPage?: number, itemsPerPage?: number) => ['officers', currentPage, itemsPerPage],
    REPORTS: (currentPage?: number, itemsPerPage?: number, reportNumber?: string, officerId?: string) => ['reports', currentPage, itemsPerPage, reportNumber, officerId],
  },
  MUTATE: {
    OFFICERS: () => ['officers'],
    REPORTS: () => ['reports'],
  }
}
