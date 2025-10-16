import { useState } from "react";
import { Filter, Search, Eye, X, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { motion } from "motion/react";
import { toast } from "sonner";

const leaveHistory = [
  {
    id: 1,
    submittedDate: "10 Okt 2025",
    leaveType: "Cuti Tahunan",
    startDate: "20 Okt 2025",
    endDate: "25 Okt 2025",
    days: 6,
    status: "approved",
    reason: "Liburan keluarga ke Bali",
    approvedBy: "Manager HR",
    approvedDate: "11 Okt 2025",
    notes: "Disetujui. Selamat berlibur!",
    timeline: [
      { status: "submitted", date: "10 Okt 2025 14:30", label: "Diajukan" },
      { status: "reviewed", date: "11 Okt 2025 09:15", label: "Sedang Ditinjau" },
      { status: "approved", date: "11 Okt 2025 10:45", label: "Disetujui" },
    ],
  },
  {
    id: 2,
    submittedDate: "5 Okt 2025",
    leaveType: "Cuti Sakit",
    startDate: "6 Okt 2025",
    endDate: "8 Okt 2025",
    days: 3,
    status: "approved",
    reason: "Sakit flu dan demam",
    approvedBy: "Manager HR",
    approvedDate: "5 Okt 2025",
    notes: "Cepat sembuh! Jangan lupa upload surat dokter.",
    timeline: [
      { status: "submitted", date: "5 Okt 2025 08:00", label: "Diajukan" },
      { status: "approved", date: "5 Okt 2025 09:30", label: "Disetujui" },
    ],
  },
  {
    id: 3,
    submittedDate: "13 Okt 2025",
    leaveType: "Cuti Tahunan",
    startDate: "15 Des 2025",
    endDate: "20 Des 2025",
    days: 6,
    status: "pending",
    reason: "Liburan akhir tahun",
    approvedBy: null,
    approvedDate: null,
    notes: null,
    timeline: [
      { status: "submitted", date: "13 Okt 2025 16:20", label: "Diajukan" },
      { status: "pending", date: "13 Okt 2025 16:20", label: "Menunggu Review" },
    ],
  },
  {
    id: 4,
    submittedDate: "1 Sep 2025",
    leaveType: "Cuti Darurat",
    startDate: "2 Sep 2025",
    endDate: "2 Sep 2025",
    days: 1,
    status: "rejected",
    reason: "Keperluan keluarga mendesak",
    approvedBy: "Manager HR",
    approvedDate: "1 Sep 2025",
    notes: "Mohon maaf, sudah ada 3 karyawan cuti di hari yang sama. Silakan reschedule.",
    timeline: [
      { status: "submitted", date: "1 Sep 2025 07:00", label: "Diajukan" },
      { status: "reviewed", date: "1 Sep 2025 08:30", label: "Sedang Ditinjau" },
      { status: "rejected", date: "1 Sep 2025 09:00", label: "Ditolak" },
    ],
  },
];

const statusConfig = {
  pending: { label: "Menunggu", color: "bg-[#F59E0B] text-white", dotColor: "bg-[#F59E0B]" },
  approved: { label: "Disetujui", color: "bg-[#10B981] text-white", dotColor: "bg-[#10B981]" },
  rejected: { label: "Ditolak", color: "bg-[#EF4444] text-white", dotColor: "bg-[#EF4444]" },
};

export function LeaveHistory() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<typeof leaveHistory[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredHistory = leaveHistory.filter((leave) => {
    const matchesStatus = statusFilter === "all" || leave.status === statusFilter;
    const matchesSearch =
      leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: leaveHistory.length,
    pending: leaveHistory.filter((l) => l.status === "pending").length,
    approved: leaveHistory.filter((l) => l.status === "approved").length,
    rejected: leaveHistory.filter((l) => l.status === "rejected").length,
  };

  const handleViewDetails = (leave: typeof leaveHistory[0]) => {
    setSelectedLeave(leave);
    setIsDialogOpen(true);
  };

  const handleCancelLeave = (leaveId: number) => {
    toast.success("Pengajuan cuti berhasil dibatalkan", {
      description: "Permohonan cuti telah dibatalkan dan dihapus dari sistem.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B]">Riwayat Cuti 📋</h1>
        <p className="text-[#64748B] mt-1">Pantau semua pengajuan cuti Anda</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-lg p-6 text-white shadow-lg"
        >
          <p className="text-sm opacity-90 mb-1">Total Pengajuan</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg p-6 text-white shadow-lg"
        >
          <p className="text-sm opacity-90 mb-1">Menunggu</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg p-6 text-white shadow-lg"
        >
          <p className="text-sm opacity-90 mb-1">Disetujui</p>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-lg p-6 text-white shadow-lg"
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
                placeholder="Cari berdasarkan jenis cuti atau alasan..."
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

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengajuan Cuti</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Jenis Cuti</TableHead>
                    <TableHead>Periode Cuti</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((leave) => (
                    <TableRow key={leave.id} className="hover:bg-[#F8FAFC]">
                      <TableCell className="font-medium">{leave.submittedDate}</TableCell>
                      <TableCell>{leave.leaveType}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#64748B]" />
                          <span>
                            {leave.startDate} - {leave.endDate}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{leave.days} hari</TableCell>
                      <TableCell>
                        <Badge
                          className={statusConfig[leave.status as keyof typeof statusConfig].color}
                        >
                          {statusConfig[leave.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewDetails(leave)}
                            className="hover:bg-[#F0F9FF] hover:text-[#06B6D4]"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {leave.status === "pending" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCancelLeave(leave.id)}
                              className="hover:bg-[#FEE2E2] hover:text-[#EF4444]"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-12 h-12 text-[#CBD5E1]" />
              </div>
              <h3 className="font-semibold text-[#1E293B] mb-2">Belum ada pengajuan cuti</h3>
              <p className="text-[#64748B] mb-4">
                Anda belum memiliki riwayat pengajuan cuti
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#06B6D4]" />
              Detail Pengajuan Cuti
            </DialogTitle>
            <DialogDescription>Informasi lengkap tentang permohonan cuti Anda</DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <Badge
                  className={`${
                    statusConfig[selectedLeave.status as keyof typeof statusConfig].color
                  } px-6 py-2 text-base`}
                >
                  {statusConfig[selectedLeave.status as keyof typeof statusConfig].label}
                </Badge>
              </div>

              {/* Leave Details */}
              <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] p-6 rounded-lg">
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
                <div className="col-span-2">
                  <p className="text-sm text-[#64748B] mb-1">Tanggal Pengajuan</p>
                  <p className="font-medium text-[#1E293B]">{selectedLeave.submittedDate}</p>
                </div>
              </div>

              {/* Reason */}
              <div>
                <p className="text-sm text-[#64748B] mb-2">Alasan</p>
                <p className="text-[#1E293B] p-4 bg-[#F8FAFC] rounded-lg">{selectedLeave.reason}</p>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-sm text-[#64748B] mb-4">Timeline Status</p>
                <div className="space-y-4">
                  {selectedLeave.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            index === selectedLeave.timeline.length - 1
                              ? statusConfig[selectedLeave.status as keyof typeof statusConfig]
                                  .dotColor
                              : "bg-[#CBD5E1]"
                          }`}
                        />
                        {index < selectedLeave.timeline.length - 1 && (
                          <div className="w-0.5 h-12 bg-[#E2E8F0]" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium text-[#1E293B]">{item.label}</p>
                        <p className="text-sm text-[#64748B]">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Info */}
              {selectedLeave.approvedBy && (
                <div className="bg-[#F0F9FF] p-4 rounded-lg border border-[#BAE6FD]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#64748B] mb-1">Diproses Oleh</p>
                      <p className="font-medium text-[#1E293B]">{selectedLeave.approvedBy}</p>
                    </div>
                    {selectedLeave.approvedDate && (
                      <div>
                        <p className="text-sm text-[#64748B] mb-1">Tanggal Approval</p>
                        <p className="font-medium text-[#1E293B]">{selectedLeave.approvedDate}</p>
                      </div>
                    )}
                  </div>
                  {selectedLeave.notes && (
                    <div className="mt-4">
                      <p className="text-sm text-[#64748B] mb-1">Catatan</p>
                      <p className="text-[#1E293B]">{selectedLeave.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Tutup
            </Button>
            {selectedLeave?.status === "pending" && (
              <Button
                variant="destructive"
                onClick={() => handleCancelLeave(selectedLeave.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Batalkan Pengajuan
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
