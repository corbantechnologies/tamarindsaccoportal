"use client";

import React from "react";
import { useFetchAuditLogs } from "@/hooks/auditlogs/actions";
import { format } from "date-fns";

export default function AuditLogsPage() {
  const { data: logs, isLoading, error } = useFetchAuditLogs();

  if (isLoading) return <div>Loading audit logs...</div>;
  if (error) return <div className="text-red-500">Error loading audit logs.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">System Audit Logs</h1>
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">Timestamp</th>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Action</th>
              <th scope="col" className="px-6 py-3">Module</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(log.created_at), "MMM d, yyyy HH:mm:ss")}
                </td>
                <td className="px-6 py-4">
                  {log.user_name ? `${log.user_name} (${log.user_member_no})` : "System/Anonymous"}
                </td>
                <td className="px-6 py-4 font-medium">{log.action}</td>
                <td className="px-6 py-4">{log.module}</td>
                <td className="px-6 py-4">{log.description}</td>
                <td className="px-6 py-4">{log.ip_address || "N/A"}</td>
              </tr>
            ))}
            {(!logs || logs.length === 0) && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">No logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
