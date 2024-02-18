import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkoutCard = ({ workout }: { workout: string[] }) => {
    console.log(workout);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description of the Disease</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {workout.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
