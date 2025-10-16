import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Upload,
  Edit2,
  Save,
  X,
  Settings,
  Bell,
  Lock,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Badge } from "../../ui/badge";
import { Switch } from "../../ui/switch";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const leaveUsageData = [
  { year: "2023", used: 10, total: 12 },
  { year: "2024", used: 12, total: 12 },
  { year: "2025", used: 8, total: 12 },
];

export function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@company.com",
    phone: "+62 812-3456-7890",
    emergencyContact: "+62 813-9876-5432",
    emergencyName: "Siti Wijaya (Istri)",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    department: "Engineering",
    position: "Senior Frontend Developer",
    employeeId: "EMP-2023-001",
    joinDate: "15 Januari 2023",
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leaveReminders: true,
    weeklyReport: false,
    language: "id",
  });

  const handleSave = () => {
    toast.success("Profil berhasil diperbarui! ✨", {
      description: "Perubahan data Anda telah tersimpan.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Perubahan dibatalkan");
  };

  const handleAvatarUpload = () => {
    toast.success("Foto profil berhasil diupdate!");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B]">Profil Saya 👤</h1>
        <p className="text-[#64748B] mt-1">Kelola informasi pribadi dan pengaturan akun Anda</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <Avatar className="w-32 h-32 ring-4 ring-[#06B6D4]/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad" />
                <AvatarFallback className="bg-gradient-to-br from-[#06B6D4] to-[#2563EB] text-white text-4xl">
                  {profileData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarUpload}
                className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-[#06B6D4] to-[#2563EB] rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="w-5 h-5" />
              </button>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#1E293B]">{profileData.name}</h2>
              <p className="text-[#64748B] mb-2">{profileData.position}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge className="bg-[#EFF6FF] text-[#2563EB]">{profileData.department}</Badge>
                <Badge className="bg-[#F0FDF4] text-[#10B981]">Active</Badge>
                <Badge className="bg-[#FEF3C7] text-[#F59E0B]">{profileData.employeeId}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-[#64748B]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Bergabung sejak {profileData.joinDate}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-[#10B981]">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Batal
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="personal" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Informasi Pribadi</span>
            <span className="sm:hidden">Info</span>
          </TabsTrigger>
          <TabsTrigger value="leave" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Data Cuti</span>
            <span className="sm:hidden">Cuti</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Pengaturan</span>
            <span className="sm:hidden">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#64748B]" />
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-[#F8FAFC]" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#64748B]" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-[#F8FAFC]"
                    />
                  </div>
                  <p className="text-xs text-[#64748B]">Email tidak dapat diubah</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#64748B]" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-[#F8FAFC]" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Posisi</Label>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#64748B]" />
                    <Input
                      id="position"
                      value={profileData.position}
                      disabled
                      className="bg-[#F8FAFC]"
                    />
                  </div>
                  <p className="text-xs text-[#64748B]">Data dari HR System</p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Alamat</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#64748B]" />
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({ ...profileData, address: e.target.value })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-[#F8FAFC]" : ""}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontak Darurat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Nama Kontak Darurat</Label>
                  <Input
                    id="emergencyName"
                    value={profileData.emergencyName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, emergencyName: e.target.value })
                    }
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#F8FAFC]" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Nomor Kontak Darurat</Label>
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) =>
                      setProfileData({ ...profileData, emergencyContact: e.target.value })
                    }
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#F8FAFC]" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Data Tab */}
        <TabsContent value="leave" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-l-4 border-l-[#06B6D4]">
                <CardContent className="pt-6">
                  <p className="text-sm text-[#64748B] mb-1">Kuota Cuti 2025</p>
                  <h3 className="text-3xl font-bold text-[#1E293B] mb-2">12 hari</h3>
                  <p className="text-sm text-[#10B981]">Sesuai standar perusahaan</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-l-4 border-l-[#F59E0B]">
                <CardContent className="pt-6">
                  <p className="text-sm text-[#64748B] mb-1">Cuti Digunakan</p>
                  <h3 className="text-3xl font-bold text-[#1E293B] mb-2">8 hari</h3>
                  <Progress value={(8 / 12) * 100} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-l-4 border-l-[#10B981]">
                <CardContent className="pt-6">
                  <p className="text-sm text-[#64748B] mb-1">Sisa Cuti</p>
                  <h3 className="text-3xl font-bold text-[#1E293B] mb-2">4 hari</h3>
                  <p className="text-sm text-[#64748B]">Hingga akhir tahun</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pemakaian Cuti Per Tahun</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leaveUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="year" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="used" name="Cuti Digunakan" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="total" name="Total Kuota" fill="#E2E8F0" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forecast Sisa Cuti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-[#F0F9FF] to-[#EFF6FF] p-6 rounded-lg">
                <h4 className="font-semibold text-[#1E293B] mb-4">Proyeksi Akhir Tahun 2025</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Kuota total:</span>
                    <span className="font-semibold text-[#1E293B]">12 hari</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Sudah digunakan:</span>
                    <span className="font-semibold text-[#1E293B]">8 hari</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Pending approval:</span>
                    <span className="font-semibold text-[#1E293B]">0 hari</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#1E293B]">Sisa tersedia:</span>
                    <span className="text-2xl font-bold text-[#06B6D4]">4 hari</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#06B6D4]" />
                Preferensi Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1E293B]">Email Notifications</p>
                  <p className="text-sm text-[#64748B]">Terima update via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1E293B]">Push Notifications</p>
                  <p className="text-sm text-[#64748B]">Notifikasi real-time di aplikasi</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, pushNotifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1E293B]">Leave Reminders</p>
                  <p className="text-sm text-[#64748B]">Pengingat cuti yang akan datang</p>
                </div>
                <Switch
                  checked={settings.leaveReminders}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, leaveReminders: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1E293B]">Weekly Report</p>
                  <p className="text-sm text-[#64748B]">Laporan mingguan aktivitas cuti</p>
                </div>
                <Switch
                  checked={settings.weeklyReport}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, weeklyReport: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#06B6D4]" />
                Bahasa & Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="language">Bahasa Aplikasi</Label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full p-2 border border-[#E2E8F0] rounded-lg bg-white"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#06B6D4]" />
                Keamanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start text-[#06B6D4] border-[#06B6D4] hover:bg-[#F0F9FF]"
              >
                <Lock className="w-4 h-4 mr-2" />
                Ubah Password
              </Button>
              <p className="text-xs text-[#64748B]">
                Password terakhir diubah: 30 September 2025
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
