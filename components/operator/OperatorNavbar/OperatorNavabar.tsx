'use client'

import Navbar from '@/components/common/layout/Navbar/Navbar'
import { StaffMemberDepartment } from '@/interfaces/api/admin/staff'
import { useMemo } from 'react'

interface OperatorNavbarProps {
  className?: string
  operatorDepartments: StaffMemberDepartment[]
}

export default function OperatorNavbar({ className, operatorDepartments }: OperatorNavbarProps) {
  const navbarLinks = useMemo(() => {
    const navbarLinks = [{ name: 'All', href: '/operator/chats/all' }]

    for (const operatorDepartment of operatorDepartments) {
      navbarLinks.push({
        name: operatorDepartment.name,
        href: '/operator/chats/' + operatorDepartment.id,
      })
    }

    return navbarLinks
  }, [operatorDepartments])

  return <Navbar className={className} links={navbarLinks} />
}
