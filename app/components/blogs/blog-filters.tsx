import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Card, CardContent } from "../ui/card";

type BlogFiltersProps = {
    searchQuery: string;
    selectedMonth: string;
    selectedYear: string;
    onSearchChange: (value: string) => void;
    onMonthChange: (value: string) => void;
    onYearChange: (value: string) => void;
};

export function BlogFilters({
    searchQuery,
    selectedMonth,
    selectedYear,
    onSearchChange,
    onMonthChange,
    onYearChange,
}: BlogFiltersProps) {
    return (
        <Card>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative sm:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari judul, penulis, atau isi artikel..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(event) => onSearchChange(event.target.value)}
                        />
                    </div>
                    <Select value={selectedMonth} onValueChange={(value) => onMonthChange(value ?? "all")}>
                        <SelectTrigger className={'w-full'}>
                            <SelectValue placeholder="Pilih Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Bulan</SelectItem>
                            {[
                                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                "Juli", "Agustus", "September", "Oktober", "November", "Desember",
                            ].map((month, index) => (
                                <SelectItem key={month} value={`${index + 1}`}>{month}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={(value) => onYearChange(value ?? "all")}>
                        <SelectTrigger className={'w-full'}>
                            <SelectValue placeholder="Pilih Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tahun</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
