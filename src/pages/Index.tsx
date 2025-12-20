import { Link } from 'react-router-dom';
import { Heart, Users, Globe, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

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

const stats = [
  { value: '1M+', label: 'Donors', icon: Users },
  { value: 'Rs. 100M+', label: 'Donated', icon: Sparkles },
  { value: '100+', label: 'Countries', icon: Globe },
  { value: '100%', label: 'Transparent', icon: Shield },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Heart className="w-4 h-4" />
              <span>Trusted by 1.000,000+ donors worldwide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Make a <span className="text-gradient">Difference</span> in Someone's Life Today
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Join our community of compassionate givers and help transform lives. 
              Every donation, no matter the size, creates ripples of positive change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/donate">
                <Button size="lg" className="btn-primary text-base px-8">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-card shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Cause
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select from various donation categories and make an impact where it matters most to you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <Link to="/donate" key={category.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CategoryCard {...category} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  At Al-Khidmat, we believe in the power of collective giving. Our mission is to connect 
                  generous hearts with those in need, creating a world where everyone has access to 
                  basic necessities, education, healthcare, and hope.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  With complete transparency and dedication, we ensure every donation reaches 
                  those who need it most. Join us in building a more compassionate world.
                </p>
                <Link to="/donate">
                  <Button className="btn-primary">
                    Start Giving Today
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6"></div>
                <div className="relative bg-card p-8 rounded-3xl shadow-card">
                  <div className="space-y-6">
                    {[
                      { label: 'Transparent Operations', value: '100%' },
                      { label: 'Funds to Beneficiaries', value: '95%' },
                      { label: 'Donor Satisfaction', value: '98%' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                          <span className="text-sm font-bold text-primary">{item.value}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: item.value }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-primary rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Your generosity can change lives. Start your giving journey today and be part of something meaningful.
              </p>
              <Link to="/donate">
                <Button size="lg" variant="secondary" className="text-base px-8">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
