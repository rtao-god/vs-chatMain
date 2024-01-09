export interface Department {
  name: string
  image: string
  id: number
  created_at: string
  updated_at: string
  deleted_at: null
  users: DepartmentOperator[]
}

export interface NewDepartment {
  name: string
  image: string
  users: DepartmentOperator[]
}

export interface DepartmentOperator {
  id: number
  name: string
  priority: number
}

export interface DepartmentFormData {
  name: string
  operators: DepartmentOperator[]
}

//hello
