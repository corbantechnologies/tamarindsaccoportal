"use client";

import React from "react";
import { useFetchAuditLogs } from "@/hooks/auditlogs/actions";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function AuditLogsPage() {
  const { data: logs, isLoading, error } = useFetchAuditLogs();

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
    </div>
  );
  if (error) return <div className="text-red-500">Error loading audit logs.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">System Audit Logs</h1>
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black font-semibold">Timestamp</TableHead>
              <TableHead className="text-black font-semibold">User</TableHead>
              <TableHead className="text-black font-semibold">Action</TableHead>
              <TableHead className="text-black font-semibold">Module</TableHead>
              <TableHead className="text-black font-semibold">Description</TableHead>
              <TableHead className="text-black font-semibold">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(log.created_at), "MMM d, yyyy HH:mm:ss")}
                </TableCell>
                <TableCell>
                  {log.user_name ? `${log.user_name} (${log.user_member_no})` : "System/Anonymous"}
                </TableCell>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell>{log.module}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{log.ip_address || "N/A"}</TableCell>
              </TableRow>
            ))}
            {(!logs || logs.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">No logs found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
