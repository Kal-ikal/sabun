import { Users, FileText, CheckCircle, Clock } from "lucide-react";
import { StatsCard } from "../StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const leaveData = [
  { month: "Jan", pengajuan: 12 },
  { month: "Feb", pengajuan: 19 },
  { month: "Mar", pengajuan: 15 },
  { month: "Apr", pengajuan: 25 },
  { month: "May", pengajuan: 22 },
  { month: "Jun", pengajuan: 30 },
];

const leaveTypeData = [
  { name: "Cuti Tahunan", value: 45, color: "#2563EB" },
  { name: "Cuti Sakit", value: 25, color: "#10B981" },
  { name: "Cuti Darurat", value: 15, color: "#F59E0B" },
  { name: "Cuti Lainnya", value: 15, color: "#7C3AED" },
];

const recentActivities = [
  {
    id: 1,
    employee: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    action: "Mengajukan cuti tahunan",
    date: "13 Okt 2025",
    status: "pending",
  },
  {
    id: 2,
    employee: "Sarah Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    action: "Cuti disetujui",
    date: "13 Okt 2025",
    status: "approved",
  },
  {
    id: 3,
    employee: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    action: "Profil diperbarui",
    date: "12 Okt 2025",
    status: "completed",
  },
  {
    id: 4,
    employee: "Emily Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    action: "Mengajukan cuti sakit",
    date: "12 Okt 2025",
    status: "pending",
  },
];

const statusConfig = {
  pending: { label: "Menunggu", color: "bg-[#F59E0B] text-white" },
  approved: { label: "Disetujui", color: "bg-[#10B981] text-white" },
  completed: { label: "Selesai", color: "bg-[#3B82F6] text-white" },
};

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang Kembali, Admin! 👋</h1>
        <p className="text-blue-100">
          Berikut adalah ringkasan aktivitas hari ini di dashboard Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Karyawan"
          value="324"
          change="+12% dari bulan lalu"
          changeType="increase"
          icon={Users}
          iconColor="#2563EB"
          iconBg="#EFF6FF"
        />
        <StatsCard
          title="Cuti Pending"
          value="23"
          change="8 perlu ditinjau"
          changeType="neutral"
          icon={Clock}
          iconColor="#F59E0B"
          iconBg="#FEF3C7"
        />
        <StatsCard
          title="Cuti Disetujui"
          value="156"
          change="+8% dari bulan lalu"
          changeType="increase"
          icon={CheckCircle}
          iconColor="#10B981"
          iconBg="#D1FAE5"
        />
        <StatsCard
          title="Total Pengajuan"
          value="179"
          change="+15% dari bulan lalu"
          changeType="increase"
          icon={FileText}
          iconColor="#7C3AED"
          iconBg="#F3E8FF"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Pengajuan Cuti</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leaveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pengajuan"
                  stroke="#2563EB"
                  strokeWidth={3}
                  dot={{ fill: "#2563EB", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Jenis Cuti</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leaveTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <Button variant="ghost" size="sm">
            Lihat Semua
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>{activity.employee.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#1E293B]">{activity.employee}</p>
                    <p className="text-sm text-[#64748B]">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#64748B]">{activity.date}</span>
                  <Badge className={statusConfig[activity.status as keyof typeof statusConfig].color}>
                    {statusConfig[activity.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto py-4 flex flex-col gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]">
              <FileText className="w-6 h-6" />
              <span>Tinjau Permohonan Cuti</span>
            </Button>
            <Button className="h-auto py-4 flex flex-col gap-2 bg-[#10B981] hover:bg-[#059669]">
              <Users className="w-6 h-6" />
              <span>Tambah Karyawan Baru</span>
            </Button>
            <Button className="h-auto py-4 flex flex-col gap-2 bg-[#7C3AED] hover:bg-[#6D28D9]">
              <CheckCircle className="w-6 h-6" />
              <span>Buat Laporan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
