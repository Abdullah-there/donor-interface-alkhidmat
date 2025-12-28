import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { supabase } from '@/supabase-client';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";


const Navbar = () => {
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [imageurl, setImageurl] = useState<string>("");
  const [openProfile, setOpenProfile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  const location = useLocation();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/donate', label: 'Donate' },
    { href: '/contact', label: 'Contact Us' },
  ];

  useEffect(() => {
    if (!session) return
    const fetchUser = async () => {
      const { data, error } = await supabase.from("users").select("*").eq("email", session.user.email);

      if (error) {
        toast.error("Error Fetching User");
        return;
      }

      const currentUser = data.filter((d) => d.role === "donor");
      console.log(currentUser[0].image_url)
      setImageurl(currentUser[0].image_url)
    }
    fetchUser();
  }, [session])

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const ChangeProfilePiscture = async () => {
    if (!file || !session) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${session.user.id}.${fileExt}`;

    setIsLoading(true);

    const { error: uploadError } = await supabase.storage
      .from("user-images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed");
      setIsLoading(false)
      return;
    }

    const { data } = supabase.storage
      .from("user-images")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const { error } = await supabase
      .from("users")
      .update({ image_url: imageUrl })
      .eq("email", session.user.email);

    if (error) {
      toast.error("Failed to update profile");
      setIsLoading(false)
      return;
    }

    setImageurl(imageUrl);
    setOpenDialog(false);
    toast.success("Profile updated");
    setIsLoading(false)
  };


  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl text-foreground">Al-Khidmat</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to={"/acknowledgment"}>
              <BellRing className='w-4 h-4 mr-2 text-muted-foreground cursor-pointer' />
            </Link>
            {session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-1.5 py-1.5 rounded-full">
                  <Popover open={openProfile} onOpenChange={setOpenProfile}>
                    <PopoverTrigger asChild>
                      <img
                        src={imageurl}
                        className="rounded-full w-7 h-7 cursor-pointer"
                      />
                    </PopoverTrigger>

                    <PopoverContent className="w-48">
                      <p className="text-sm font-medium">
                        {session.user.user_metadata.full_name}
                      </p>

                      <Button
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => {
                          setOpenProfile(false);
                          setOpenDialog(true);
                        }}
                      >
                        Change Profile
                      </Button>
                    </PopoverContent>
                  </Popover>

                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/donate">
                  <Button size="sm" className="btn-primary">
                    Donate Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                {session ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <img src={imageurl} alt="User Profile Image" className='rounded-full w-7 h-20' />
                    </div>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Login</Button>
                    </Link>
                    <Link to="/donate" onClick={() => setIsOpen(false)}>
                      <Button className="w-full btn-primary">Donate Now</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Image</DialogTitle>
          </DialogHeader>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <Button className="mt-4" onClick={ChangeProfilePiscture} disabled={IsLoading}>
            {IsLoading ? "Uploading" : "Upload"}
          </Button>
        </DialogContent>
      </Dialog>

    </nav>
  );
};

export default Navbar;
