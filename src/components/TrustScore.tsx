
import { Star } from "lucide-react";

interface TrustScoreProps {
  score: number;
}

const TrustScore = ({ score }: TrustScoreProps) => {
  // Calculate full and partial stars
  const fullStars = Math.floor(score);
  const hasHalfStar = score - fullStars >= 0.5;
  
  const renderStars = () => {
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          size={14} 
          className="fill-primary text-primary"
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={14} className="text-muted" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={14} className="fill-primary text-primary" />
          </div>
        </div>
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          size={14} 
          className="text-muted"
        />
      );
    }
    
    return stars;
  };
  
  return (
    <div className="flex items-center">
      <div className="flex">{renderStars()}</div>
      <span className="ml-1 text-xs text-muted-foreground">Trust Score</span>
    </div>
  );
};

export default TrustScore;
