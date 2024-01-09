export interface AnnualDepartmentStatistics {
  departmentName: string
  monthlyStatistics: ({ success: number; failure: number } | null)[]
}
