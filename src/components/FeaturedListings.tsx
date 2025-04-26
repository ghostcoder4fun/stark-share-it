
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Mock listings data
const mockListings = [
  {
    id: "1",
    title: "Professional Camera Kit",
    price: 25,
    priceUnit: "day",
    imageUrl: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=500&h=350",
    location: "Downtown",
    rating: 4.9,
    reviews: 27,
  },
  {
    id: "2",
    title: "Electric Power Tools Set",
    price: 15,
    priceUnit: "day",
    imageUrl: "https://images.unsplash.com/photo-1581788604067-769a11325b0a?auto=format&fit=crop&q=80&w=500&h=350",
    location: "Westside",
    rating: 4.7,
    reviews: 18,
  },
  {
    id: "3",
    title: "Camping Equipment",
    price: 40,
    priceUnit: "weekend",
    imageUrl: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=500&h=350",
    location: "Northend",
    rating: 4.8,
    reviews: 32,
  },
];

const FeaturedListings = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4">
      {mockListings.map((listing) => (
        <Card 
          key={listing.id}
          className="overflow-hidden border-none shadow-sm"
          onClick={() => navigate(`/item/${listing.id}`)}
        >
          <CardContent className="p-0">
            <div 
              className="h-36 bg-cover bg-center" 
              style={{ backgroundImage: `url(${listing.imageUrl})` }}
            />
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-1">
                {listing.title}
              </h3>
              <div className="flex items-center mt-1">
                <span className="text-sm font-semibold">
                  ${listing.price}/{listing.priceUnit}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {listing.location}
                </span>
                <div className="flex items-center">
                  <span className="text-xs">★ {listing.rating}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedListings;
