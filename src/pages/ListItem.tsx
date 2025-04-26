
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Plus, Image } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ListItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    pricePerDay: "",
    depositAmount: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // In a real app, you'd upload these files to storage
      // For this demo, we'll create local object URLs
      newFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        setUploadedImages((prev) => [...prev, url]);
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.pricePerDay) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (uploadedImages.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image of your item.",
        variant: "destructive",
      });
      return;
    }
    
    // Submit item listing (would connect to backend in real app)
    toast({
      title: "Listing Created!",
      description: "Your item has been successfully listed for rent.",
    });
    
    // Navigate back to home page
    navigate("/");
  };

  return (
    <div className="app-container pb-6">
      <div className="flex items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold">List Your Item</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Item Photos <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {uploadedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-cover bg-center rounded-md"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
              
              <label className="aspect-square border-2 border-dashed border-muted flex items-center justify-center rounded-md cursor-pointer">
                <div className="flex flex-col items-center">
                  <Plus size={24} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">Add Photo</span>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Upload up to 5 photos of your item
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              name="title"
              placeholder="What are you listing?"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              name="description"
              placeholder="Describe your item in detail..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Category <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Price per day ($) <span className="text-destructive">*</span>
              </label>
              <Input
                name="pricePerDay"
                type="number"
                min="1"
                step="1"
                placeholder="25"
                value={formData.pricePerDay}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Deposit Amount ($)
              </label>
              <Input
                name="depositAmount"
                type="number"
                min="0"
                step="1"
                placeholder="100"
                value={formData.depositAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Location <span className="text-destructive">*</span>
            </label>
            <Input
              name="location"
              placeholder="Where is this item located?"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          
          <Button type="submit" className="w-full mt-6">
            Create Listing
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ListItem;
