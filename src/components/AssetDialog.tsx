import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface Asset {
  id: number;
  name: string;
  category: string;
  status: "Tersedia" | "Dipinjamkan" | "Perlu Perawatan";
  borrower?: string;
}

interface AssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset?: Asset | null;
  onSave: (asset: Omit<Asset, "id"> & { id?: number }) => void;
}

export function AssetDialog({
  open,
  onOpenChange,
  asset,
  onSave,
}: AssetDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Tersedia" as Asset["status"],
    borrower: "",
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name,
        category: asset.category,
        status: asset.status,
        borrower: asset.borrower || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        status: "Tersedia",
        borrower: "",
      });
    }
  }, [asset, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: asset?.id,
      name: formData.name,
      category: formData.category,
      status: formData.status,
      borrower: formData.borrower || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby="asset-dialog-description">
        <DialogHeader>
          <DialogTitle>
            {asset ? "Edit Aset" : "Tambah Aset Baru"}
          </DialogTitle>
          <DialogDescription id="asset-dialog-description">
            {asset
              ? "Perbarui informasi aset di bawah ini"
              : "Masukkan informasi aset baru di bawah ini"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Aset</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Contoh: Laptop Dell XPS 13"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="Contoh: Komputer, Monitor, Printer"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Asset["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tersedia">Tersedia</SelectItem>
                  <SelectItem value="Dipinjamkan">Dipinjamkan</SelectItem>
                  <SelectItem value="Perlu Perawatan">
                    Perlu Perawatan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.status === "Dipinjamkan" && (
              <div className="grid gap-2">
                <Label htmlFor="borrower">Peminjam</Label>
                <Input
                  id="borrower"
                  value={formData.borrower}
                  onChange={(e) =>
                    setFormData({ ...formData, borrower: e.target.value })
                  }
                  placeholder="Nama peminjam"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {asset ? "Perbarui" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
