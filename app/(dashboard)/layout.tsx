import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-background lg:ml-64">
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}