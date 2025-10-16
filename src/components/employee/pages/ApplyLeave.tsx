import { useState } from "react";
import { Calendar, Upload, AlertCircle, CheckCircle2, FileText, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Calendar as CalendarComponent } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Alert, AlertDescription } from "../../ui/alert";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { format, differenceInDays } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";

const leaveTypes = [
  { value: "annual", label: "Cuti Tahunan", quota: 4 },
  { value: "sick", label: "Cuti Sakit", quota: 12 },
  { value: "emergency", label: "Cuti Darurat", quota: 3 },
  { value: "family", label: "Cuti Keluarga", quota: 2 },
  { value: "unpaid", label: "Cuti Tanpa Gaji", quota: null },
];

export function ApplyLeave() {
  const [step, setStep] = useState(1);
  const [leaveType, setLeaveType] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reason, setReason] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedLeaveType = leaveTypes.find((type) => type.value === leaveType);
  const daysCount = dateFrom && dateTo ? differenceInDays(dateTo, dateFrom) + 1 : 0;
  const hasEnoughQuota = selectedLeaveType?.quota ? daysCount <= selectedLeaveType.quota : true;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success("Cuti berhasil diajukan! 🎊", {
      description: "Permohonan cuti Anda sedang dalam proses review.",
    });
    
    setIsSubmitting(false);
    setStep(4);
  };

  const resetForm = () => {
    setStep(1);
    setLeaveType("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setReason("");
    setAttachments([]);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B]">Ajukan Cuti 📝</h1>
        <p className="text-[#64748B] mt-1">
          Isi formulir di bawah untuk mengajukan permohonan cuti
        </p>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? "bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-white shadow-lg"
                      : "bg-[#E2E8F0] text-[#64748B]"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step > s ? "bg-gradient-to-r from-[#06B6D4] to-[#2563EB]" : "bg-[#E2E8F0]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#64748B] mt-2">
            <span className={step >= 1 ? "text-[#06B6D4] font-medium" : ""}>Jenis Cuti</span>
            <span className={step >= 2 ? "text-[#06B6D4] font-medium" : ""}>Tanggal</span>
            <span className={step >= 3 ? "text-[#06B6D4] font-medium" : ""}>Detail</span>
            <span className={step >= 4 ? "text-[#06B6D4] font-medium" : ""}>Konfirmasi</span>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {/* Step 1: Leave Type */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Pilih Jenis Cuti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setLeaveType(type.value)}
                      className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-lg ${
                        leaveType === type.value
                          ? "border-[#06B6D4] bg-[#F0F9FF] shadow-lg shadow-[#06B6D4]/20"
                          : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                      }`}
                    >
                      <h3 className="font-semibold text-[#1E293B] mb-2">{type.label}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#64748B]">
                          {type.quota ? `Sisa kuota: ${type.quota} hari` : "Tanpa batas"}
                        </span>
                        {leaveType === type.value && (
                          <CheckCircle2 className="w-5 h-5 text-[#06B6D4]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!leaveType}
                    className="bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
                  >
                    Lanjut
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Dates */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Pilih Tanggal Cuti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tanggal Mulai</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
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
                        <Button variant="outline" className="w-full justify-start">
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
                          disabled={(date) => dateFrom ? date < dateFrom : false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {dateFrom && dateTo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert className={hasEnoughQuota ? "border-[#06B6D4]" : "border-[#EF4444]"}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <span className="font-semibold">Total: {daysCount} hari</span>
                        <br />
                        {!hasEnoughQuota && (
                          <span className="text-[#EF4444]">
                            Kuota cuti tidak mencukupi! Sisa kuota: {selectedLeaveType?.quota} hari
                          </span>
                        )}
                        {hasEnoughQuota && selectedLeaveType?.quota && (
                          <span className="text-[#06B6D4]">
                            Sisa kuota setelah cuti ini: {selectedLeaveType.quota - daysCount} hari
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Kembali
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!dateFrom || !dateTo || !hasEnoughQuota}
                    className="bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
                  >
                    Lanjut
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Detail Permohonan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reason">Alasan Cuti *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Jelaskan alasan pengajuan cuti Anda..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                  <p className="text-xs text-[#64748B]">{reason.length}/500 karakter</p>
                </div>

                <div className="space-y-2">
                  <Label>Lampiran Dokumen (Opsional)</Label>
                  <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 text-center hover:border-[#06B6D4] transition-colors">
                    <Upload className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
                    <p className="text-sm text-[#64748B] mb-2">
                      Klik untuk upload atau drag & drop
                    </p>
                    <p className="text-xs text-[#94A3B8] mb-4">
                      PDF, JPG, PNG (Max. 5MB)
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Pilih File
                    </Button>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#06B6D4]" />
                            <span className="text-sm text-[#1E293B]">{file.name}</span>
                            <span className="text-xs text-[#64748B]">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Kembali
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!reason || isSubmitting}
                    className="bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Mengirim...
                      </>
                    ) : (
                      "Ajukan Cuti"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-2 border-[#10B981]">
              <CardContent className="pt-12 pb-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
                  Cuti Berhasil Diajukan! 🎊
                </h2>
                <p className="text-[#64748B] mb-8">
                  Permohonan cuti Anda sedang dalam proses review oleh atasan.
                  <br />
                  Estimasi waktu approval: 1-2 hari kerja
                </p>

                <div className="bg-[#F8FAFC] rounded-lg p-6 max-w-md mx-auto mb-8">
                  <h3 className="font-semibold text-[#1E293B] mb-4">Ringkasan Pengajuan</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Jenis Cuti:</span>
                      <span className="font-medium text-[#1E293B]">
                        {selectedLeaveType?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Periode:</span>
                      <span className="font-medium text-[#1E293B]">
                        {dateFrom && dateTo
                          ? `${format(dateFrom, "dd MMM", { locale: id })} - ${format(
                              dateTo,
                              "dd MMM yyyy",
                              { locale: id }
                            )}`
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Durasi:</span>
                      <span className="font-medium text-[#1E293B]">{daysCount} hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Status:</span>
                      <Badge className="bg-[#F59E0B] text-white">Menunggu Approval</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                  >
                    Ajukan Cuti Lagi
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
                    onClick={() => window.location.reload()}
                  >
                    Kembali ke Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
