"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AmenityCard {
  title: string;
  price: number;
  image: string;
}

const amenities: AmenityCard[] = [
  {
    title: "Gym",
    price: 5,
    image: "dist/golf.png?height=200&width=400",
  },
  {
    title: "Pool Area Beach Chairs",
    price: 10,
    image: "dist/pool.png?height=200&width=400",
  },
  {
    title: "Golf Simulator",
    price: 50,
    image: "dist/golf.png?height=200&width=400",
  },
  {
    title: "Tennis Court",
    price: 15,
    image: "dist/tennis.png?height=200&width=400",
  },
  {
    title: "Spa Treatment",
    price: 75,
    image: "dist/spa.png?height=200&width=400",
  },
  {
    title: "Yoga Class",
    price: 20,
    image: "dist/yoga.png?height=200&width=400",
  },
  {
    title: "Bike Rental",
    price: 12,
    image: "dist/bike.png?height=200&width=400",
  },
];

export default function AmenitiesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const totalPages = Math.ceil(amenities.length / 3);

  const scrollPrev = useCallback(() => {
    if (api) {
      const targetIndex =
        (currentIndex - 3 + amenities.length) % amenities.length;
      api.scrollTo(targetIndex);
    }
  }, [api, currentIndex, amenities.length]);

  const scrollNext = useCallback(() => {
    if (api) {
      const targetIndex = (currentIndex + 3) % amenities.length;
      api.scrollTo(targetIndex);
    }
  }, [api, currentIndex, amenities.length]);

  return (
    <div className="w-full mx-auto px-auto group">
      <div className="relative">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {amenities.map((amenity, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <Card className="overflow-hidden border border-gray-200 rounded-2xl transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 shadow-none cursor-pointer">
                  <CardHeader className="py-2 px-3 space-y-1">
                    <CardTitle className="text-xl align-left text-left font-semibold text-[20px]">
                      {amenity.title}
                    </CardTitle>
                    <p className="text-base font-normal text-left align-left text-gray-600">
                      ${amenity.price}
                    </p>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={amenity.image}
                        alt={amenity.title}
                        className="w-full h-[200px] object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-3">
                    <Button className="bg-[#2F6B6B] hover:bg-[#245454] text-white rounded-xl py-2 px-3 transition-colors duration-200">
                      Book
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-sm"
          onClick={scrollPrev}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-sm"
          onClick={scrollNext}
          style={{ transform: "translate(50%, -50%)" }}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index * 3)}
            className={`h-2 rounded-full transition-all ${
              Math.floor(currentIndex / 3) === index
                ? "bg-[#2F6B6B] w-8"
                : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
