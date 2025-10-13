import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { useAuth } from "./AuthContext";
import { toast } from "sonner@2.0.3";

interface LoginPageProps {
  onNavigateToRegister: () => void;
}

export function LoginPage({ onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login berhasil!");
      } else {
        toast.error("Email atau password salah. Pastikan Anda sudah mendaftar terlebih dahulu.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan saat login. Pastikan server sudah berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Annual</h1>
          <p className="text-slate-600">Sistem Manajemen Aset</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Belum punya akun?{" "}
            <button
              onClick={onNavigateToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Daftar sekarang
            </button>
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              ℹ️ Petunjuk Penggunaan:
            </p>
            <p className="text-xs text-blue-700">
              1. Klik "Daftar sekarang" untuk membuat akun baru
              <br />
              2. Isi form registrasi dengan lengkap
              <br />
              3. Setelah registrasi, Anda akan langsung masuk ke dashboard
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs font-semibold text-amber-900 mb-2">
              ⚠️ Penting:
            </p>
            <p className="text-xs text-amber-700">
              Pastikan server Supabase sudah berjalan. Jika ada error, periksa console untuk detail.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
