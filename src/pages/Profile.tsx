
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { LogOut, Settings, Star, Heart, Package, ChevronRight, Edit } from "lucide-react";
import TrustScore from "@/components/TrustScore";

const ProfileSection = ({
  title,
  icon,
  children,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    className="flex items-center justify-between p-3 border-b cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-3">{title}</span>
    </div>
    <div className="flex items-center">
      {children}
      <ChevronRight size={16} className="ml-2 text-muted-foreground" />
    </div>
  </div>
);

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <p className="text-muted-foreground mb-6">
          Please sign in to access your profile
        </p>
        <Button onClick={() => alert("Sign in functionality would go here")}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="app-container pb-6">
      <div className="flex justify-between items-center py-6">
        <h1 className="text-xl font-semibold">My Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full w-6 h-6"
          >
            <Edit size={12} />
          </Button>
        </div>
        <div className="ml-4 flex-1">
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <TrustScore score={user.trustScore} />
          <p className="text-xs text-muted-foreground mt-1">
            Member since {user.joinedDate}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg overflow-hidden shadow-sm mb-6">
        <ProfileSection
          title="My Listings"
          icon={<Package size={20} className="text-primary" />}
          onClick={() => alert("My listings")}
        >
          <span className="text-sm text-muted-foreground">3 items</span>
        </ProfileSection>

        <ProfileSection
          title="Rentals"
          icon={<Star size={20} className="text-primary" />}
          onClick={() => alert("My rentals")}
        >
          <span className="text-sm text-muted-foreground">2 active</span>
        </ProfileSection>

        <ProfileSection
          title="Saved Items"
          icon={<Heart size={20} className="text-primary" />}
          onClick={() => alert("Saved items")}
        >
          <span className="text-sm text-muted-foreground">12 items</span>
        </ProfileSection>
      </div>

      <div className="bg-card rounded-lg overflow-hidden shadow-sm">
        <ProfileSection
          title="Payment Methods"
          icon={<span className="text-xl">💳</span>}
          onClick={() => alert("Payment methods")}
        >
          <span className="text-sm text-muted-foreground">2 cards</span>
        </ProfileSection>

        <ProfileSection
          title="Address Information"
          icon={<span className="text-xl">📍</span>}
          onClick={() => alert("Address information")}
        >
          <span className="text-sm text-muted-foreground">1 address</span>
        </ProfileSection>

        <ProfileSection
          title="Help & Support"
          icon={<span className="text-xl">❓</span>}
          onClick={() => alert("Help & support")}
        >
          <></>
        </ProfileSection>
      </div>

      <Button
        variant="ghost"
        className="w-full mt-6 text-destructive"
        onClick={logout}
      >
        <LogOut size={16} className="mr-2" />
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
