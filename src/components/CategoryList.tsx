
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "tools", name: "Tools" },
  { id: "electronics", name: "Electronics" },
  { id: "photography", name: "Photography" },
  { id: "outdoor", name: "Outdoor" },
  { id: "furniture", name: "Furniture" },
  { id: "clothing", name: "Clothing" },
  { id: "vehicles", name: "Vehicles" },
];

const CategoryList = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="whitespace-nowrap rounded-full px-4"
            onClick={() => navigate(`/explore?category=${category.id}`)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
