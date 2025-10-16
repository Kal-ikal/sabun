import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { useAuth } from "./AuthContext";
import { toast } from "sonner@2.0.3";
import { User, ArrowLeft } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface ProfilePageProps {
  onNavigateBack: () => void;
}

export function ProfilePage({ onNavigateBack }: ProfilePageProps) {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await updateProfile({
          ...user,
          name,
          email,
        });
        toast.success("Profile berhasil diperbarui!");
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Gagal memperbarui profile");
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout berhasil!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onNavigateBack}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Kembali ke Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Profil Pengguna
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <User size={48} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                <p className="text-slate-600 mb-2">{user?.email}</p>
                <p className="text-sm text-slate-500">{user?.role}</p>
              </div>
            </Card>

            {/* Edit Profile Form */}
            <Card className="md:col-span-2 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Informasi Akun
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    type="text"
                    value={user?.role || ""}
                    disabled
                    className="w-full bg-slate-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {!isEditing ? (
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Edit Profil
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Simpan Perubahan
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setName(user?.name || "");
                          setEmail(user?.email || "");
                        }}
                      >
                        Batal
                      </Button>
                    </>
                  )}
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full sm:w-auto"
                >
                  Logout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
