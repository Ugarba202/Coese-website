"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    searchKey: keyof T;
    searchPlaceholder?: string;
    onAdd?: () => void;
    addLabel?: string;
}

export function DataTable<T>({
    data,
    columns,
    searchKey,
    searchPlaceholder = "Search...",
    onAdd,
    addLabel = "Add New"
}: DataTableProps<T>) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const filteredData = data.filter((row) => {
        const value = row[searchKey];
        if (typeof value === 'string') {
            return value.toLowerCase().includes(search.toLowerCase());
        }
        return false;
    });

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coesa-muted" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full bg-coesa-midnight/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-coesa-electric focus:ring-1 focus:ring-coesa-electric transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filter
                    </button>
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="flex-1 sm:flex-none btn-gradient px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-coesa-electric/20 hover:shadow-coesa-electric/40 transition-all active:scale-95"
                        >
                            {addLabel}
                        </button>
                    )}
                </div>
            </div>

            <div className="glass border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-coesa-muted uppercase bg-white/5 border-b border-white/5">
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i} className="px-6 py-4 font-medium tracking-wider">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/90">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                        {columns.map((col, j) => (
                                            <td key={j} className="px-6 py-4 whitespace-nowrap">
                                                {col.cell ? col.cell(row) : String(row[col.accessorKey as keyof T])}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center text-coesa-muted">
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm text-coesa-muted">
                            Showing <span className="text-white">{startIndex + 1}</span> to <span className="text-white">{Math.min(startIndex + rowsPerPage, filteredData.length)}</span> of <span className="text-white">{filteredData.length}</span> results
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg border border-white/10 text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-medium text-white px-2">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg border border-white/10 text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
