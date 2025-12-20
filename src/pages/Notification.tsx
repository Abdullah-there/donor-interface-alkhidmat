import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Heart, ArrowLeft, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Notification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const donation = location.state?.donationData as any | undefined;

  if (!donation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">No Transaction Found</h1>
            <p className="text-muted-foreground mb-6">
              It looks like you haven't made a donation yet.
            </p>
            <Link to="/donate">
              <Button className="btn-primary">Make a Donation</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isSuccess = donation.status === 'success';
  const formattedDate = new Date(donation.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8 animate-scale-in">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
              isSuccess ? 'bg-success/10' : 'bg-destructive/10'
            }`}>
              {isSuccess ? (
                <CheckCircle className="w-12 h-12 text-success" />
              ) : (
                <XCircle className="w-12 h-12 text-destructive" />
              )}
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className={`p-6 text-center ${isSuccess ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <h1 className={`text-2xl font-bold mb-2 ${isSuccess ? 'text-success' : 'text-destructive'}`}>
                {isSuccess ? 'Thank You!' : 'Payment Failed'}
              </h1>
              <p className="text-muted-foreground">
                {isSuccess
                  ? 'Your donation has been successfully processed.'
                  : 'Unfortunately, your payment could not be processed.'}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm text-foreground">{donation.transactionId}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-2xl font-bold text-foreground">Rs. {donation.amount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium text-foreground">{donation.category}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium text-foreground capitalize">{donation.payment_method}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="text-sm text-foreground">{formattedDate}</span>
              </div>
            </div>

            {isSuccess && (
              <div className="px-6 pb-6">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Your generosity will help make a real difference in someone's life. 
                    Together, we're building a more compassionate world.
                  </p>
                </div>
              </div>
            )}

            <div className="p-6 bg-muted/30 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-3">
                {isSuccess ? (
                  <>
                    <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </>
                ) : (
                  <Button className="btn-primary flex-1" onClick={() => navigate('/donate')}>
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notification;
