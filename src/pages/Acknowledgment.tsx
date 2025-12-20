"use client";

import { supabase } from "@/supabase-client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/auth-context";
import { Bell } from "lucide-react";

interface Acknowledgment {
    id: number;
    user_email: string;
    title: string;
    message: string;
    created_at: string;
}

const Acknowledgment = () => {
    const { session } = useAuth();
    const [acknowledgment, setAcknowledgment] = useState<Acknowledgment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        const getAcknowledgment = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("acknowledgment")
                .select("*")
                .eq("user_email", session.user.email)
                .order("created_at", { ascending: false });

            if (!error && data) setAcknowledgment(data);
            setLoading(false);
        };

        getAcknowledgment();
    }, [session]);

    if (!session) {
        return (
            <>
                <Navbar />
                <div className="min-h-[80vh] flex items-center justify-center text-blue-700 font-medium">
                    Login first to view notifications.
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-secondary/30 px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Bell className="text-blue-700" />
                        <h1 className="text-2xl font-semibold">
                            Notifications
                        </h1>
                    </div>

                    {loading && (
                        <p className="text-blue-600">Loading notifications...</p>
                    )}

                    {!loading && acknowledgment.length === 0 && (
                        <div className="bg-white p-6 rounded-xl shadow text-center text-blue-600">
                            No notifications yet.
                        </div>
                    )}

                    <div className="space-y-4">
                        {acknowledgment.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border-l-4 border-blue-600 p-5 rounded-xl shadow-sm"
                            >
                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-semibold">
                                        {item.title}
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="mt-2 text-gray-700">
                                    {item.message}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Acknowledgment;
