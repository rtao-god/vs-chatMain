'use client'

import Navbar from '@/components/common/layout/Navbar/Navbar'

interface AdminNavbarProps {
  className?: string
}

export default function AdminNavbar({ className }: AdminNavbarProps) {
  const links = [
    { name: 'Operators', href: '/admin/operators' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Chat', href: '/admin/chats' },
    { name: 'Departments', href: '/admin/departments' },
  ]

  return <Navbar className={className} links={links} />
}
