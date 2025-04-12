import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Devloper",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-4xl mx-auto my-20 flex items-center">
        <CarouselPrevious />
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex md:basis-1/2 lg:basis-1/3"
            >
              <Button variant="outline" className="mx-auto rounded-full">
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext  />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
