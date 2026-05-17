import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import CommandPalette from "@/components/CommandPalette";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profile = {
    fullName: (user.firstName || "") + " " + (user.lastName || ""),
    agencyName: "Agency Intelligence",
    initials: (user.firstName?.[0] || "A") + (user.lastName?.[0] || ""),
    email: user.emailAddresses[0].emailAddress,
    image: user.imageUrl,
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      {/* Sidebar - FIXED & STABLE */}
      <div className="hidden lg:flex w-[280px] h-full shrink-0 border-r border-slate-100 bg-white z-[60]">
        <Sidebar profile={profile} />
      </div>
      
      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
        
        {/* Top Navigation */}
        <TopNav profile={profile} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10 w-full">
          <CommandPalette />
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Global Grain */}
      <div className="film-grain" />
    </div>
  );
}
