import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import MetricCards from "@/components/MetricCards";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import MetricCharts from "@/components/MetricCharts";
import Calendar from "@/components/Calendar";
import ServiceRequest from "@/components/ServiceRequest";
import { Navigation } from "@/components/sidebar";
import AmenitiesCarousel from "@/components/AmenitiesCarousel";

export default function Page() {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar Navigation */}
      <SidebarProvider>
        <Navigation />
        {/* Main Content Area */}
        <SidebarInset>
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex justify-center">
              <div className="w-full max-w-[1440px]">
                <Header />
              </div>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 flex justify-center overflow-y-auto">
              {/* Content Wrapper with Max Width */}
              <div className="w-full max-w-[1440px] flex flex-col gap-8 p-4">
                {/* Workspace Header (included in scrollable area) */}
                <div className="shrink-0">
                  <WorkspaceHeader />
                </div>
                <div className="shrink-0">
                  <AmenitiesCarousel />
                </div>
                <MetricCards />
                <MetricCharts />
                <div className="grid grid-cols-2 gap-4">
                  <Calendar />
                  <ServiceRequest />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
