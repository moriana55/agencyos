import type { Metadata } from 'next'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'

export const metadata: Metadata = {
  title: 'AgencyOS — Intelligence Hub',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const user = await currentUser()

  const profile = {
    fullName:   `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Kullanıcı',
    agencyName: (user?.unsafeMetadata?.agency_name as string) || 'Ajansım',
    email:      user?.emailAddresses?.[0]?.emailAddress || '',
    initials:   `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'U',
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F1F5F9]">
      <div className="hidden lg:block w-[260px] flex-shrink-0 h-full">
        <Sidebar profile={profile} />
      </div>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopNav profile={profile} />
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
