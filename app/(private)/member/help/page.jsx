"use client";

import React from "react";
import { 
    HelpCircle, 
    ArrowRight, 
    Rocket, 
    PiggyBank, 
    HandCoins, 
    FileText, 
    ShieldCheck, 
    UserCircle,
    Mail,
    MessageCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function TamarindMemberHelpCenter() {
    const primaryColor = "#cc5500";

    const quickLinks = [
        { title: "Getting Started", icon: Rocket, desc: "Basics of the Tamarind portal." },
        { title: "Savings Guide", icon: PiggyBank, desc: "How to manage your deposits." },
        { title: "Loan Application", icon: HandCoins, desc: "How to apply for credit." },
        { title: "Statements", icon: FileText, desc: "Download your financial reports." }
    ];

    const faqs = [
        {
            q: "How do I activate my account?",
            a: "Follow the link in your Tamarind invitation email to set your password."
        },
        {
            q: "How long does it take for my payment to reflect?",
            a: "Payments are typically updated by the end of the day to ensure accurate bank reconciliation."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 space-y-8 mx-auto">
            <div className="text-center space-y-4 py-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cc5500]/10 text-[#cc5500] text-xs font-bold uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4" />
                    Member Support
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                    How can we help?
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Welcome to the Tamarind SACCO Support Center.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickLinks.map((link, idx) => (
                    <Card key={idx} className="hover:border-[#cc5500] transition-all hover:shadow-md cursor-pointer group">
                        <CardHeader className="space-y-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#cc5500] group-hover:bg-[#cc5500] group-hover:text-white transition-colors">
                                <link.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">{link.title}</CardTitle>
                                <CardDescription className="text-xs leading-relaxed">{link.desc}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 text-[#cc5500]">
                        <ShieldCheck className="w-6 h-6" />
                        FAQs
                    </h2>
                    <Card>
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`}>
                                        <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-[#cc5500]">
                                            {faq.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 leading-relaxed">
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
