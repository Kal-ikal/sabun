import { useState } from "react";
import { Search, Filter, Download, Check, X, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { motion } from "motion/react";

const leaveRequests = [
  {
    id: 1,
    employee: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      department: "Engineering",
    },
    leaveType: "Cuti Tahunan",
    startDate: "15 Okt 2025",
    endDate: "20 Okt 2025",
    days: 6,
    reason: "Liburan keluarga",
    status: "pending",
    submittedDate: "10 Okt 2025",
  },
  {
    id: 2,
    employee: {
      name: "Sarah Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      department: "Marketing",
    },
    leaveType: "Cuti Sakit",
    startDate: "14 Okt 2025",
    endDate: "16 Okt 2025",
    days: 3,
    reason: "Sakit flu",
    status: "pending",
    submittedDate: "13 Okt 2025",
  },
  {
    id: 3,
    employee: {
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      department: "Sales",
    },
    leaveType: "Cuti Tahunan",
    startDate: "20 Okt 2025",
    endDate: "25 Okt 2025",
    days: 6,
    reason: "Perjalanan bisnis pribadi",
    status: "approved",
    submittedDate: "8 Okt 2025",
  },
  {
    id: 4,
    employee: {
      name: "Emily Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      department: "HR",
    },
    leaveType: "Cuti Darurat",
    startDate: "13 Okt 2025",
    endDate: "13 Okt 2025",
    days: 1,
    reason: "Keperluan keluarga mendesak",
    status: "pending",
    submittedDate: "12 Okt 2025",
  },
  {
    id: 5,
    employee: {
      name: "David Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      department: "Engineering",
    },
    leaveType: "Cuti Tahunan",
    startDate: "1 Nov 2025",
    endDate: "10 Nov 2025",
    days: 10,
    reason: "Liburan akhir tahun",
    status: "rejected",
    submittedDate: "10 Okt 2025",
  },
];

const statusConfig = {
  pending: { label: "Menunggu", color: "bg-[#F59E0B] text-white" },
  approved: { label: "Disetujui", color: "bg-[#10B981] text-white" },
  rejected: { label: "Ditolak", color: "bg-[#EF4444] text-white" },
};

export function LeaveApproval() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<typeof leaveRequests[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesSearch =
      request.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter((r) => r.status === "pending").length,
    approved: leaveRequests.filter((r) => r.status === "approved").length,
    rejected: leaveRequests.filter((r) => r.status === "rejected").length,
  };

  const handleViewDetails = (request: typeof leaveRequests[0]) => {
    setSelectedLeave(request);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B]">Persetujuan Cuti</h1>
          <p className="text-[#64748B] mt-1">Kelola dan tinjau permohonan cuti karyawan</p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8]">
          <Download className="w-4 h-4 mr-2" />
          Ekspor Data
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg p-6 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Total Pengajuan</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg p-6 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Menunggu</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg p-6 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Disetujui</p>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-lg p-6 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Ditolak</p>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </motion.div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Cari karyawan atau jenis cuti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Permohonan Cuti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Karyawan</TableHead>
                  <TableHead>Jenis Cuti</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={request.employee.avatar} />
                          <AvatarFallback>{request.employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#1E293B]">{request.employee.name}</p>
                          <p className="text-sm text-[#64748B]">{request.employee.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-[#1E293B]">{request.startDate}</p>
                        <p className="text-[#64748B]">s/d {request.endDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>{request.days} hari</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[request.status as keyof typeof statusConfig].color}>
                        {statusConfig[request.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewDetails(request)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {request.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-[#10B981] hover:bg-[#059669]">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-[#EF4444] hover:bg-[#DC2626]">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Permohonan Cuti</DialogTitle>
            <DialogDescription>Informasi lengkap tentang permohonan cuti</DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedLeave.employee.avatar} />
                  <AvatarFallback>{selectedLeave.employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-[#1E293B]">
                    {selectedLeave.employee.name}
                  </h3>
                  <p className="text-[#64748B]">{selectedLeave.employee.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Jenis Cuti</p>
                  <p className="font-medium text-[#1E293B]">{selectedLeave.leaveType}</p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Durasi</p>
                  <p className="font-medium text-[#1E293B]">{selectedLeave.days} hari</p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Tanggal Mulai</p>
                  <p className="font-medium text-[#1E293B]">{selectedLeave.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Tanggal Selesai</p>
                  <p className="font-medium text-[#1E293B]">{selectedLeave.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Tanggal Pengajuan</p>
                  <p className="font-medium text-[#1E293B]">{selectedLeave.submittedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Status</p>
                  <Badge
                    className={
                      statusConfig[selectedLeave.status as keyof typeof statusConfig].color
                    }
                  >
                    {statusConfig[selectedLeave.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-[#64748B] mb-2">Alasan</p>
                <p className="text-[#1E293B] p-4 bg-[#F8FAFC] rounded-lg">
                  {selectedLeave.reason}
                </p>
              </div>
            </div>
          )}
          {selectedLeave?.status === "pending" && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button className="bg-[#EF4444] hover:bg-[#DC2626]">
                <X className="w-4 h-4 mr-2" />
                Tolak
              </Button>
              <Button className="bg-[#10B981] hover:bg-[#059669]">
                <Check className="w-4 h-4 mr-2" />
                Setujui
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
