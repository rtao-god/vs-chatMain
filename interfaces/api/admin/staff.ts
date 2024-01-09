export interface StaffMemberDepartment {
  id: number
  name: string
  priority: number
}

export interface StaffMember {
  id: number
  name: string
  email: string
  password: string
  image: string | null
  is_admin?: boolean
  departments: StaffMemberDepartment[]
}

export type NewStaffMember = Omit<StaffMember, 'id'>
