import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import MetricCards from "@/components/MetricCards";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import MetricCharts from "@/components/MetricCharts";
import Calendar from "@/components/Calendar";
import ServiceRequest from "@/components/ServiceRequest";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header>
          <Header />
        </header>
        <div className="flex flex-1 flex-col gap-8 p-4 pt-4">
          <WorkspaceHeader
            workspaceName="Nobu Residences Toronto"
            temperature={75}
            condition="Sunny"
            location="Toronto"
          />
          <MetricCards />
          <MetricCharts />
          <div className="grid grid-cols-2 gap-4">
            <Calendar />
            <ServiceRequest />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
