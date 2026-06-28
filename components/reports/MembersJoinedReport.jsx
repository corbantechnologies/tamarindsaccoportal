import React, { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useFetchMembers } from "@/hooks/members/actions";
import MemberLoadingSpinner from "@/components/general/MemberLoadingSpinner";
import { CheckCircle, Clock } from "lucide-react";

export default function MembersJoinedReport() {
    const currentYear = new Date().getFullYear();
    const currentMonth = (new Date().getMonth() + 1).toString(); // 1-12

    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const { data: members, isLoading, error } = useFetchMembers();

    const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    const filteredMembers = useMemo(() => {
        if (!members) return [];
        return members.filter((member) => {
            // Check for common date fields
            const dateStr = member.date_joined || member.created_at || member.created || member.createdAt;
            if (!dateStr) return false;
            
            const joinDate = new Date(dateStr);
            if (isNaN(joinDate.getTime())) return false;

            const memberYear = joinDate.getFullYear().toString();
            const memberMonth = (joinDate.getMonth() + 1).toString();

            return memberYear === selectedYear && memberMonth === selectedMonth;
        });
    }, [members, selectedYear, selectedMonth]);

    if (isLoading) return <MemberLoadingSpinner />;
    if (error) return <div className="p-12 text-center text-muted-foreground">Unable to load Members List</div>;

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Members Joined Report</CardTitle>
                        <CardDescription>
                            List of members who joined the SACCO in {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
                        </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Employer</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredMembers.map((member) => (
                                <TableRow key={member.member_no || member.reference || member.id}>
                                    <TableCell className="font-medium">{member.member_no}</TableCell>
                                    <TableCell>{member.salutation || ''} {member.first_name} {member.last_name}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.employer}</TableCell>
                                    <TableCell>
                                        {new Date(member.date_joined || member.created_at || member.created || member.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                          variant={member.is_approved ? "default" : "secondary"}
                                          className={
                                            member.is_approved
                                              ? "bg-primary text-white"
                                              : "bg-gray-200 text-gray-800"
                                          }
                                        >
                                          {member.is_approved ? (
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                          ) : (
                                            <Clock className="h-3 w-3 mr-1" />
                                          )}
                                          {member.is_approved ? "Approved" : "Pending"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredMembers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                        No members joined in this period.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
