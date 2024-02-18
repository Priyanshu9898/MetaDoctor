import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DescriptionCard = ({ description }: { description: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description of the Disease</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
