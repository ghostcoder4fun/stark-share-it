
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import CategoryList from "@/components/CategoryList";
import FeaturedListings from "@/components/FeaturedListings";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app-container py-6">
      <h1 className="text-xl font-semibold mb-4">Explore Items</h1>
      
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter size={18} />
        </Button>
      </div>

      <CategoryList />

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">All Items</h2>
          <Button variant="link" className="text-sm p-0">
            Sort by: Newest
          </Button>
        </div>
        
        <FeaturedListings />
        <div className="h-4" />
        <FeaturedListings />
        <div className="h-4" />
        <FeaturedListings />
      </div>
    </div>
  );
};

export default Explore;
