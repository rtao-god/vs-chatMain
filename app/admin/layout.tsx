import Header from '@/components/common/layout/Header/Header';

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <>
    <Header />
    {children}
  </>
}
