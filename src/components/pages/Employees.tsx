import { useState } from "react";
import { UserPlus, Search, MoreVertical, Mail, Phone, MapPin, Edit, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";

const employees = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    position: "Senior Frontend Developer",
    department: "Engineering",
    email: "john.doe@company.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta",
    status: "active",
    joinDate: "Jan 2023",
  },
  {
    id: 2,
    name: "Sarah Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    position: "Marketing Manager",
    department: "Marketing",
    email: "sarah.smith@company.com",
    phone: "+62 813-4567-8901",
    location: "Bandung",
    status: "active",
    joinDate: "Mar 2022",
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    position: "Sales Executive",
    department: "Sales",
    email: "michael.chen@company.com",
    phone: "+62 814-5678-9012",
    location: "Surabaya",
    status: "active",
    joinDate: "Jul 2023",
  },
  {
    id: 4,
    name: "Emily Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    position: "HR Specialist",
    department: "HR",
    email: "emily.johnson@company.com",
    phone: "+62 815-6789-0123",
    location: "Jakarta",
    status: "active",
    joinDate: "Nov 2021",
  },
  {
    id: 5,
    name: "David Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    position: "Backend Developer",
    department: "Engineering",
    email: "david.wilson@company.com",
    phone: "+62 816-7890-1234",
    location: "Yogyakarta",
    status: "active",
    joinDate: "May 2023",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    position: "Product Designer",
    department: "Design",
    email: "lisa.anderson@company.com",
    phone: "+62 817-8901-2345",
    location: "Bali",
    status: "inactive",
    joinDate: "Feb 2022",
  },
];

const departments = ["All", "Engineering", "Marketing", "Sales", "HR", "Design"];

const statusConfig = {
  active: { label: "Aktif", color: "bg-[#10B981] text-white" },
  inactive: { label: "Tidak Aktif", color: "bg-[#64748B] text-white" },
};

export function Employees() {
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const matchesDepartment =
      departmentFilter === "All" || employee.department === departmentFilter;
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === "active").length,
    departments: new Set(employees.map((e) => e.department)).size,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B]">Manajemen Karyawan</h1>
          <p className="text-[#64748B] mt-1">Kelola informasi dan data karyawan</p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1D4ED8]"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Karyawan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg p-6 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Total Karyawan</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg p-6 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Karyawan Aktif</p>
          <p className="text-3xl font-bold">{stats.active}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-lg p-6 text-white"
        >
          <p className="text-sm opacity-90 mb-1">Total Departemen</p>
          <p className="text-3xl font-bold">{stats.departments}</p>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Cari karyawan berdasarkan nama, posisi, atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Tabs */}
      <Tabs value={departmentFilter} onValueChange={setDepartmentFilter}>
        <TabsList className="w-full md:w-auto flex-wrap">
          {departments.map((dept) => (
            <TabsTrigger key={dept} value={dept}>
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={employee.avatar} />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-[#1E293B]">{employee.name}</h3>
                      <p className="text-sm text-[#64748B]">{employee.position}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[#EF4444]">
                        <Trash className="w-4 h-4 mr-2" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#EFF6FF] text-[#2563EB]">
                    {employee.department}
                  </Badge>
                  <Badge
                    className={statusConfig[employee.status as keyof typeof statusConfig].color}
                  >
                    {statusConfig[employee.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B]">
                    <MapPin className="w-4 h-4" />
                    <span>{employee.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0]">
                  <p className="text-xs text-[#64748B]">
                    Bergabung sejak {employee.joinDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Karyawan Baru</DialogTitle>
            <DialogDescription>Masukkan informasi karyawan baru</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Posisi</Label>
              <Input id="position" placeholder="Senior Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Pilih departemen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" placeholder="+62 812-3456-7890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input id="location" placeholder="Jakarta" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8]">
              Tambah Karyawan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
