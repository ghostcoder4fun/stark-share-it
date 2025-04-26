
import { useState } from "react";

interface ItemDetailGalleryProps {
  images: string[];
}

const ItemDetailGallery = ({ images }: ItemDetailGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="bg-muted h-full w-full flex items-center justify-center">
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div 
        className="h-full w-full bg-cover bg-center" 
        style={{ backgroundImage: `url(${images[0]})` }}
      />
    );
  }

  return (
    <div className="relative h-full">
      <div 
        className="h-full w-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${images[activeIndex]})` }}
      />

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === activeIndex ? "bg-primary" : "bg-background/70"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemDetailGallery;
