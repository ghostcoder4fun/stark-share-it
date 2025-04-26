
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import FeaturedListings from "@/components/FeaturedListings";
import CategoryList from "@/components/CategoryList";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="app-container">
          {isAuthenticated && user ? (
            <h1 className="text-xl font-semibold mb-2">
              Welcome back, {user.name.split(" ")[0]}
            </h1>
          ) : (
            <h1 className="text-xl font-semibold mb-2">Welcome to RentlyApp</h1>
          )}
          <p className="text-sm opacity-85 mb-6">
            Find items to rent or list yours to earn extra income
          </p>
          
          <Button 
            onClick={() => navigate("/explore")} 
            variant="secondary" 
            className="w-full flex items-center justify-between"
          >
            <span className="text-muted-foreground">What are you looking for?</span>
            <Search size={18} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="app-container py-6">
        <CategoryList />
        
        <h2 className="text-lg font-semibold mt-8 mb-4">Featured Items</h2>
        <FeaturedListings />
        
        <h2 className="text-lg font-semibold mt-8 mb-4">Nearby Items</h2>
        <FeaturedListings />

        <div className="bg-muted p-6 rounded-lg mt-8 text-center">
          <h3 className="font-medium mb-2">Ready to earn extra income?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            List your items for rent and start earning today!
          </p>
          <Button onClick={() => navigate("/list-item")}>List an Item</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
