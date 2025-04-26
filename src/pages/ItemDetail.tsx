
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Star, Share, Heart, Calendar as CalendarIcon, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import ItemDetailGallery from "@/components/ItemDetailGallery";
import TrustScore from "@/components/TrustScore";

// Mock item data
const mockItem = {
  id: "1",
  title: "Professional Camera Kit - Canon EOS R5 with Lenses",
  description: "Rent my professional camera kit including Canon EOS R5, three prime lenses, tripod, and carrying case. Perfect for photoshoots, events or video production. The kit is in excellent condition and regularly maintained.",
  price: 25,
  priceUnit: "day",
  deposit: 200,
  location: "Downtown, Main St",
  owner: {
    id: "owner1",
    name: "Sarah Miller",
    photoUrl: "https://i.pravatar.cc/150?img=5",
    trustScore: 4.9,
    joinedDate: "March 2022",
    responseRate: 98,
  },
  images: [
    "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=1770&h=1000",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1770&h=1000",
    "https://images.unsplash.com/photo-1581591525695-7792757001e5?auto=format&fit=crop&q=80&w=1770&h=1000",
  ],
  rating: 4.8,
  reviews: 27,
  availability: "Available Now",
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  return (
    <div className="pb-6">
      {/* Gallery */}
      <div className="relative h-72">
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-4 left-4 z-10 rounded-full bg-background/60 backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="secondary" size="icon" className="rounded-full bg-background/60 backdrop-blur-sm">
            <Share size={20} />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-background/60 backdrop-blur-sm">
            <Heart size={20} />
          </Button>
        </div>
        <ItemDetailGallery images={mockItem.images} />
      </div>

      {/* Content */}
      <div className="app-container mt-4">
        <h1 className="text-xl font-semibold">{mockItem.title}</h1>
        
        <div className="flex items-center mt-2">
          <Star size={16} className="text-primary" />
          <span className="ml-1 text-sm font-medium">{mockItem.rating}</span>
          <span className="mx-1 text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{mockItem.reviews} reviews</span>
          <span className="mx-1 text-sm text-muted-foreground">•</span>
          <div className="flex items-center">
            <MapPin size={14} className="text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">{mockItem.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 py-3 border-y">
          <div>
            <span className="text-xl font-semibold">${mockItem.price}</span>
            <span className="text-sm text-muted-foreground">/{mockItem.priceUnit}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Rent Now</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose Rental Dates</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(day) => date && day < date}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Rental fee</span>
                    <span>${mockItem.price} x {date && endDate ? Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 3600 * 24)) : 0} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security deposit</span>
                    <span>${mockItem.deposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$5</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>
                      ${date && endDate 
                        ? mockItem.deposit + (mockItem.price * Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 3600 * 24))) + 5 
                        : mockItem.deposit + 5}
                    </span>
                  </div>
                </div>

                <Button className="w-full">Confirm Rental</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-4">
          <h2 className="font-semibold">Description</h2>
          <p className="mt-2 text-sm">{mockItem.description}</p>
        </div>
        
        <div className="mt-6 flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src={mockItem.owner.photoUrl} 
              alt={mockItem.owner.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <div className="font-medium">{mockItem.owner.name}</div>
            <TrustScore score={mockItem.owner.trustScore} />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={() => navigate(`/messages?user=${mockItem.owner.id}`)}
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
