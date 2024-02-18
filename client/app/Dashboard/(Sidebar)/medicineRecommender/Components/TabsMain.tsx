"use client";

import { useState, useTransition } from "react";
import TabButton from "./tab-button";
import DescriptionCard from "./DescriptionCard";
import { Description } from "@radix-ui/react-dialog";
import WorkoutCard from "./WorkoutCard";
import DataCard from "./DataCard";

export default function TabsMain({
  description,
  workout,
  medications,
  diets,
  precautions,
}: {
  description: string;
  workout: string[];
  medications: string[];
  diets: string[];
  precautions: string[];
}) {
  const [activeTab, setActiveTab] = useState("Description");
  const [isPending, startTransition] = useTransition();

  function selectTab(tab: string) {
    startTransition(() => {
      setActiveTab(tab);
    });
  }

  //   console.log(workout, medications, diets, precautions);

  return (
    <section className="">
      <div className=" sm:max-w-[100vw] md:max-w-full">
        <section className="mt-2  overflow-auto">
          <div className="flex flex-nowrap w-full sm:overflow-x-auto md:overflow-hidden items-center justify-between gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 p-1.5 text-gray-500 dark:text-gray-400">
            <TabButton
              value="Description"
              activeTab={activeTab}
              onClick={() => selectTab("Description")}
            >
              Description
            </TabButton>
            <TabButton
              value="Diets"
              isPending={isPending}
              activeTab={activeTab}
              onClick={() => selectTab("Diets")}
            >
              Diets
            </TabButton>
            <TabButton
              value="Medications"
              activeTab={activeTab}
              onClick={() => selectTab("Medications")}
            >
              Medications
            </TabButton>
            <TabButton
              value="Precautions"
              activeTab={activeTab}
              onClick={() => selectTab("Precautions")}
            >
              Precautions
            </TabButton>
            <TabButton
              value="Workout"
              style={{ minWidth: "18%" }}
              activeTab={activeTab}
              onClick={() => selectTab("Workout")}
            >
              Workout
            </TabButton>
          </div>
        </section>
        <div className="mt-3">
          {activeTab === "Description" && (
            <DescriptionCard description={description} />
          )}
          {activeTab === "Workout" && <DataCard data={workout} />}
          {activeTab === "Medications" && <DataCard data={medications} />}
          {activeTab === "Diets" && <DataCard data={diets} />}
          {activeTab === "Precautions" && <DataCard data={precautions} />}
        </div>
      </div>
    </section>
  );
}
