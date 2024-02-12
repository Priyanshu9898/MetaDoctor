import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      position: "CEO of HealthTech",
      testimonial:
        "Using MetaDoctor has transformed our healthcare operations, making diagnostics faster, more accurate, and significantly improving patient care. It's been a game-changer for us.",
      avatar: "/Images/landingPage/people6.jpg",
    },
    {
      id: 2,
      name: "Alexa Johnson",
      position: "Director of Innovation",
      testimonial:
        "MetaDoctor's AI-driven insights have not only optimized our workflow but also enhanced our predictive capabilities. It's an essential tool in our tech arsenal.",
      avatar: "/Images/landingPage/people7.jpg",
    },
    {
      id: 3,
      name: "Maria Gonzalez",
      position: "Healthcare Administrator",
      testimonial:
        "The ease of integration and immediate impact on operational efficiency is unmatched. MetaDoctor has elevated the standard of care we provide.",
      avatar: "/Images/landingPage/people3.jpg",
    },
    {
      id: 4,
      name: "Samuel Adams",
      position: "Lead Research Scientist",
      testimonial:
        "MetaDoctor's precision in disease classification and medicine recommendations has significantly contributed to our research. It's revolutionary.",
      avatar: "/Images/landingPage/people4.jpg",
    },
    {
      id: 5,
      name: "Linda Smith",
      position: "Nurse Practitioner",
      testimonial:
        "The intuitive design and reliability of MetaDoctor have made it indispensable in our daily routines, improving both patient outcomes and staff satisfaction.",
      avatar: "/Images/landingPage/people5.jpg",
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section className="py-12 bg-gray-50 dark:bg-[#1e2837]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            What Our Users Say
          </h2>
          <p className="text-md mt-4 text-gray-600 dark:text-gray-400">
            Real feedback from our valued users
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full max-w-[500px]"
          >
            <CarouselContent className="dark:bg-[#374151]">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="flex flex-col items-center justify-center p-4 dark:bg-[#374151]">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-contain mb-4"
                    />
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                    <p className="mt-4 text-md text-center">
                      {testimonial.testimonial}
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
