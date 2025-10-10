import { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AssetDialog, Asset } from "./AssetDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";
import { assetsApi } from "../utils/api";

function getStatusColor(status: Asset["status"]) {
  switch (status) {
    case "Tersedia":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Dipinjamkan":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    case "Perlu Perawatan":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}

export function AssetTable() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);

  // Load assets from server
  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const { assets: serverAssets } = await assetsApi.getAll();
      setAssets(serverAssets || []);
    } catch (error) {
      console.error("Error loading assets:", error);
      toast.error("Gagal memuat data aset");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsset = async (assetData: Omit<Asset, "id"> & { id?: number }) => {
    try {
      setLoading(true);

      if (assetData.id) {
        // Edit existing asset
        await assetsApi.update(assetData.id, assetData);
        toast.success("Aset berhasil diperbarui!");
      } else {
        // Add new asset
        await assetsApi.create(assetData);
        toast.success("Aset baru berhasil ditambahkan!");
      }

      // Reload assets
      await loadAssets();
      setEditingAsset(null);
    } catch (error) {
      console.error("Error saving asset:", error);
      toast.error("Gagal menyimpan aset");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsset = async () => {
    if (assetToDelete) {
      try {
        setLoading(true);
        await assetsApi.delete(assetToDelete.id);
        toast.success("Aset berhasil dihapus!");
        
        // Reload assets
        await loadAssets();
        setAssetToDelete(null);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting asset:", error);
        toast.error("Gagal menghapus aset");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (asset: Asset) => {
    setEditingAsset(asset);
    setDialogOpen(true);
  };

  const handleDeleteClick = (asset: Asset) => {
    setAssetToDelete(asset);
    setDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingAsset(null);
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden">
        {/* Table Header */}
        <div className="p-4 md:p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Daftar Aset Terbaru
            </h2>
            <Button
              onClick={handleAddClick}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white self-start sm:self-auto"
            >
              <Plus size={16} className="mr-2" />
              <span className="hidden sm:inline">Tambah Aset Baru</span>
              <span className="sm:hidden">Tambah</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Nama Aset
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                  Kategori
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  Peminjam
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loading && assets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Memuat data...
                  </td>
                </tr>
              ) : assets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Belum ada data aset. Klik "Tambah Aset Baru" untuk memulai.
                  </td>
                </tr>
              ) : (
                assets.map((asset, index) => {
                  return (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {index + 1}
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">
                      {asset.name}
                    </div>
                    <div className="text-xs text-slate-500 sm:hidden">
                      {asset.category}
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden sm:table-cell">
                    {asset.category}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(asset.status)}
                    >
                      <span className="hidden sm:inline">{asset.status}</span>
                      <span className="sm:hidden">
                        {asset.status === "Tersedia" ? "✓" : 
                         asset.status === "Dipinjamkan" ? "→" : "⚠"}
                      </span>
                    </Badge>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">
                    {asset.borrower || "-"}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(asset)}
                        className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                      >
                        <Edit size={14} />
                        <span className="sr-only">Edit {asset.name}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(asset)}
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                        <span className="sr-only">Delete {asset.name}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Asset Dialog */}
      <AssetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        asset={editingAsset}
        onSave={handleSaveAsset}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Aset</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus aset "{assetToDelete?.name}"?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAsset}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}