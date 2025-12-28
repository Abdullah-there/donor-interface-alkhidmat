import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building2, Wallet, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/context/auth-context';
import { supabase } from '@/supabase-client';

const categories = [
  {
    id: 'zakat',
    title: 'Zakat',
    description: 'Fulfill your religious obligation by giving Zakat to those in need.',
    icon: "Heart",
    color: '#22c55e',
    minAmount: 50,
  },
  {
    id: 'sadqah',
    title: 'Sadqah',
    description: 'Voluntary charity to earn blessings and help the less fortunate.',
    icon: "HandHeart",
    color: '#f59e0b',
    minAmount: 10,
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Support underprivileged students with scholarships and resources.',
    icon: "BookOpen",
    color: '#3b82f6',
    minAmount: 25,
  },
  {
    id: 'health',
    title: 'Health',
    description: 'Fund medical treatments and healthcare for those who cannot afford it.',
    icon: "Stethoscope",
    color: '#ef4444',
    minAmount: 30,
  },
  {
    id: 'emergency',
    title: 'Emergency Relief',
    description: 'Provide immediate aid to disaster victims and crisis situations.',
    icon: "AlertTriangle",
    color: '#8b5cf6',
    minAmount: 20,
  },
  {
    id: 'gaza',
    title: 'Gaza Funds',
    description: 'Provide immediate aid to Gaza civilians and rebuild resources.',
    icon: "AlertTriangle",
    color: '#8b5cf6',
    minAmount: 20,
  },
];

const paymentMethods = [
  {
    id: 'cash',
    title: 'Cash',
    description: 'Visit our office or arrange pickup',
    icon: DollarSign,
  },
  {
    id: 'online',
    title: 'Online Wallet',
    description: 'PayPal, Stripe, or local wallets',
    icon: Wallet,
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: Building2,
  },
];

const Donate = () => {
  const { session } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online Wallet');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);
  const quickAmounts = [25, 50, 100, 250, 500];

  const MakeDonation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    const donationAmount = parseFloat(amount);
    if (!donationAmount || donationAmount <= 0) {
      alert('Invalid amount');
      return;
    }

    if (selectedCategoryData && donationAmount < selectedCategoryData.minAmount) {
      alert('Minimum amount required');
      return;
    }

    setIsProcessing(true);

    const data = {
      user_email: session?.user.email,
      category: selectedCategoryData!.title,
      amount: donationAmount,
      payment_method: paymentMethod,
      status: "success",
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    const notiData = {
      user_email: session?.user.email,
      title: "Payment Confirmed",
      message : `Your Payment of ${selectedCategoryData!.title} with an amount of Rs. ${donationAmount} using ${paymentMethod} as payment Method with TransactionId: ${data.transactionId} is confirmed.`,
    }

    const donation = await supabase.from("donations").insert(data).select().single();

    const donationData = donation.data;

    await supabase.from("acknowledgment").insert(notiData).single();

    setIsProcessing(false);
    navigate('/notification', { state: { donationData } });
  };

  if (!session) {
        return (
            <>
                <Navbar />
                <div className="min-h-[80vh] flex items-center justify-center text-blue-700 font-medium">
                    Login first to Donate.
                </div>
            </>
        );
    }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {isProcessing && <LoadingSpinner message="Processing your donation..." />}

      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Make a Donation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your generosity creates lasting change. Choose a cause and make your contribution today.
          </p>
        </div>
      </section>

      <form onSubmit={MakeDonation} className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <h2 className="text-xl font-semibold text-foreground">Select a Category</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    {...category}
                    selected={selectedCategory === category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                ))}
              </div>
              
              {selectedCategoryData && (
                <p className="text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg">
                  Minimum donation for {selectedCategoryData.title}: <span className="font-semibold text-foreground">Rs. {selectedCategoryData.minAmount}</span>
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <h2 className="text-xl font-semibold text-foreground">Choose Amount</h2>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="flex flex-wrap gap-3 mb-6">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        amount === quickAmount.toString()
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-accent'
                      }`}
                    >
                      Rs. {quickAmount}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Custom Amount</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium"></span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 text-lg input-style"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <h2 className="text-xl font-semibold text-foreground">Payment Method</h2>
              </div>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      htmlFor={method.id}
                      className={`relative flex flex-col p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={method.title} id={method.id} className="sr-only" />
                      <method.icon className="w-8 h-8 text-primary mb-3" />
                      <span className="font-semibold text-foreground">{method.title}</span>
                      <span className="text-sm text-muted-foreground">{method.description}</span>
                      {paymentMethod === method.id && (
                        <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-primary" />
                      )}
                    </label>
                  ))}
                </div>
              </RadioGroup>

              <div className="bg-secondary/30 p-6 rounded-xl">
                {paymentMethod === 'cash' && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Cash Payment Instructions</h4>
                    <p className="text-sm text-muted-foreground">
                      Visit our office at 123 Charity Lane, Hope City, HC 12345 during business hours (9 AM - 5 PM).
                      Alternatively, call +1 (555) 123-4567 to arrange a pickup.
                    </p>
                  </div>
                )}
                {paymentMethod === 'online' && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Online Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      Securely pay via PayPal, Stripe, or local wallets. Your payment information is encrypted and secure.
                    </p>
                    <div className="flex gap-4 mt-3">
                      <div className="px-4 py-2 bg-card rounded-lg text-sm font-medium">PayPal</div>
                      <div className="px-4 py-2 bg-card rounded-lg text-sm font-medium">Stripe</div>
                      <div className="px-4 py-2 bg-card rounded-lg text-sm font-medium">JazzCash</div>
                    </div>
                  </div>
                )}
                {paymentMethod === 'bank' && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Bank Transfer Details</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><span className="font-medium">Bank:</span> First National Bank</p>
                      <p><span className="font-medium">Account Name:</span> ALkhidmat Foundation</p>
                      <p><span className="font-medium">Account Number:</span> 1234567890</p>
                      <p><span className="font-medium">Routing Number:</span> 021000021</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Leave a message with your donation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-style resize-none"
                rows={3}
              />
            </div>

            <div className="pt-6 border-t border-border">
              <Button type="submit" size="lg" className="w-full md:w-auto btn-primary text-base px-12">
                <CreditCard className="w-5 h-5 mr-2" />
                Complete Donation
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                🔒 Your payment is secure and encrypted. By donating, you agree to our terms of service.
              </p>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Donate;
