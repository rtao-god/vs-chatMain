import { NewStaffMember, StaffMember } from '@/interfaces/api/admin/staff'
import Api from '../base/Api'

export default class StaffApi extends Api {
  async fetchStaffMemberList(): Promise<StaffMember[]> {
    const staffMemberList = this.query({ path: '/staff' })
    return staffMemberList
  }

  async fetchStaffMember(id: string | number): Promise<StaffMember> {
    const staffMember = this.query({ path: '/staff/' + id })
    return staffMember
  }

  async updateStaffMember(staffMember: StaffMember) {
    if (!staffMember.image?.startsWith('data:')) staffMember = { ...staffMember, image: null }
    await this.query({ path: '/staff/' + staffMember.id, method: 'PUT', body: staffMember })
  }

  async createStaffMember(staffMember: NewStaffMember) {
    if (!staffMember.image?.startsWith('data:')) staffMember = { ...staffMember, image: null }
    await this.query({ path: '/staff', method: 'POST', body: staffMember })
  }
  
  async deleteStaffMember(id: string | number) {
    await this.query({ path: '/staff/' + id, method: 'DELETE' })
  }
}
