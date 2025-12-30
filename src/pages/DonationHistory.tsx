import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/auth-context';
import type { Donation } from '@/lib/auth';
import { toast } from 'sonner';
import { supabase } from '@/supabase-client';

const DonationHistory = () => {
  const { session } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const getAllDonations = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .eq('user_email', session.user.email)
          .order('created_at', { ascending: false });

        if (error) {
          toast.error('Error fetching donation history');
          return;
        }

        setDonations(data || []);
      } catch {
        toast.error('Error loading donation history');
      } finally {
        setIsLoading(false);
      }
    };

    getAllDonations();
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700">
        Login first to view donation history.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-secondary/30 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-black mb-6">
            Donation History
          </h1>

          {isLoading && (
            <p className="text-blue-600">Loading donation history...</p>
          )}

          {!isLoading && donations.length === 0 && (
            <div className="bg-white p-6 rounded-xl shadow text-center text-black">
              No donations found.
            </div>
          )}

          {!isLoading && donations.length > 0 && (
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-100 text-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Payment</th>
                    <th className="px-4 py-3 text-left">Transaction ID</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b last:border-none"
                    >
                      <td className="px-4 py-3">
                        {donation.created_at
                          ? new Date(donation.created_at).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-4 py-3">{donation.category}</td>
                      <td className="px-4 py-3 font-medium text-blue-700">
                        Rs. {donation.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {donation.payment_method}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {donation.transactionId}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            donation.status === 'success'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DonationHistory;
