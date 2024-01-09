import { NewStaffMember } from '@/interfaces/api/admin/staff'

export function getInitialStaffMember(): NewStaffMember {
  return {
    name: '',
    email: '',
    password: '',
    image: null,
    departments: []
  }
}
