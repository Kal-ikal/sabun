import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, Users, Clock, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const monthlyData = [
  { month: "Jan", cuti: 45, karyawan: 320, approval: 42 },
  { month: "Feb", cuti: 52, karyawan: 325, approval: 50 },
  { month: "Mar", cuti: 48, karyawan: 328, approval: 46 },
  { month: "Apr", cuti: 61, karyawan: 330, approval: 58 },
  { month: "May", cuti: 55, karyawan: 332, approval: 53 },
  { month: "Jun", cuti: 67, karyawan: 335, approval: 65 },
];

const departmentData = [
  { department: "Engineering", employees: 85, leaves: 23 },
  { department: "Marketing", employees: 42, leaves: 12 },
  { department: "Sales", employees: 65, leaves: 18 },
  { department: "HR", employees: 28, leaves: 8 },
  { department: "Design", employees: 35, leaves: 10 },
];

export function Reports() {
  const [reportType, setReportType] = useState("leave");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B]">Sistem Laporan</h1>
          <p className="text-[#64748B] mt-1">Analisis dan ekspor data perusahaan</p>
        </div>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Konfigurasi Laporan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Report Type */}
            <div className="space-y-2">
              <Label htmlFor="reportType">Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="reportType">
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leave">Laporan Cuti</SelectItem>
                  <SelectItem value="employee">Laporan Karyawan</SelectItem>
                  <SelectItem value="department">Laporan Departemen</SelectItem>
                  <SelectItem value="attendance">Laporan Kehadiran</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Tanggal Mulai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP", { locale: id }) : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Tanggal Selesai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP", { locale: id }) : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8]">
              <FileText className="w-4 h-4 mr-2" />
              Ekspor PDF
            </Button>
            <Button className="bg-[#10B981] hover:bg-[#059669]">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Ekspor Excel
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Ekspor CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Total Cuti Bulan Ini</p>
            <Clock className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-bold">67</p>
          <p className="text-sm opacity-75 mt-1">+12% dari bulan lalu</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Approval Rate</p>
            <TrendingUp className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-bold">94%</p>
          <p className="text-sm opacity-75 mt-1">+3% dari bulan lalu</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Rata-rata Durasi</p>
            <Calendar className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-bold">5.2</p>
          <p className="text-sm opacity-75 mt-1">hari per pengajuan</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Active Employees</p>
            <Users className="w-5 h-5 opacity-75" />
          </div>
          <p className="text-3xl font-bold">335</p>
          <p className="text-sm opacity-75 mt-1">+5 dari bulan lalu</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
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
                  dataKey="cuti"
                  name="Pengajuan Cuti"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ fill: "#2563EB" }}
                />
                <Line
                  type="monotone"
                  dataKey="approval"
                  name="Cuti Disetujui"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Analisis Per Departemen</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="department" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="employees" name="Jumlah Karyawan" fill="#2563EB" radius={[8, 8, 0, 0]} />
                <Bar dataKey="leaves" name="Pengajuan Cuti" fill="#7C3AED" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-[#F8FAFC] rounded-lg p-6">
              <h3 className="font-semibold text-lg text-[#1E293B] mb-4">
                Laporan Cuti - Oktober 2025
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-3">Ringkasan Eksekutif</h4>
                  <ul className="space-y-2 text-sm text-[#64748B]">
                    <li>• Total pengajuan cuti: 67 permintaan</li>
                    <li>• Cuti yang disetujui: 63 permintaan (94%)</li>
                    <li>• Cuti yang ditolak: 4 permintaan (6%)</li>
                    <li>• Rata-rata waktu approval: 1.5 hari</li>
                    <li>• Departemen dengan cuti terbanyak: Engineering</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-3">Analisis Trend</h4>
                  <ul className="space-y-2 text-sm text-[#64748B]">
                    <li>• Peningkatan 12% dari bulan sebelumnya</li>
                    <li>• Cuti tahunan: 45 permintaan (67%)</li>
                    <li>• Cuti sakit: 15 permintaan (22%)</li>
                    <li>• Cuti darurat: 7 permintaan (11%)</li>
                    <li>• Peak period: Minggu ke-3 Oktober</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline">
                Edit Laporan
              </Button>
              <Button className="bg-[#2563EB] hover:bg-[#1D4ED8]">
                <Download className="w-4 h-4 mr-2" />
                Download Laporan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
