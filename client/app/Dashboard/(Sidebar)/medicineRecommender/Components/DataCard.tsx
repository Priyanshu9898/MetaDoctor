import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DataCard = ({ data }: { data: string[] }) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Description of the Disease</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {data && data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DataCard;
