import { Department, NewDepartment } from '@/interfaces/api/admin/department'
import Api from '../base/Api'

export default class DepartmentsApi extends Api {
  async fetchDepartmentList(): Promise<Department[]> {
    const departmentList = await this.query({ path: '/departments' })
    return departmentList
  }

  async fetchDepartment(id: string | number): Promise<Department> {
    const department = await this.query({ path: '/departments/' + id })
    return department
  }

  async deleteDepartment(id: string | number): Promise<Department> {
    const department = await this.query({ path: '/departments/' + id, method: 'DELETE' })
    return department
  }

  async createDepartment(department: NewDepartment): Promise<Department> {
    const newDepartment = await this.query({ path: '/departments', method: 'POST', body: department })
    return newDepartment
  }

  async updateDepartment(department: NewDepartment, departmentId: number): Promise<Department> {
    const updatedDepartment = await this.query({ path: `/departments/${departmentId}`, method: 'PUT', body: department })
    return updatedDepartment
  }
}
