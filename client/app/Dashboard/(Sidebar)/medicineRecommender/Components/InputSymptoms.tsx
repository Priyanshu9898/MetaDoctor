"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MEDICINE_RECOMMENDATION_API } from "@/utils/APIs/api";
import axios from "axios";
import TabsMain from "./TabsMain";

type Symptom = string;

const symptoms: Symptom[] = [
  "itching",
  "skin_rash",
  "nodal_skin_eruptions",
  "continuous_sneezing",
  "shivering",
  "chills",
  "joint_pain",
  "stomach_pain",
  "acidity",
  "ulcers_on_tongue",
  "muscle_wasting",
  "vomiting",
  "burning_micturition",
  "spotting_urination",
  "fatigue",
  "weight_gain",
  "anxiety",
  "cold_hands_and_feets",
  "mood_swings",
  "weight_loss",
  "restlessness",
  "lethargy",
  "patches_in_throat",
  "irregular_sugar_level",
  "cough",
  "high_fever",
  "sunken_eyes",
  "breathlessness",
  "sweating",
  "dehydration",
  "indigestion",
  "headache",
  "yellowish_skin",
  "dark_urine",
  "nausea",
  "loss_of_appetite",
  "pain_behind_the_eyes",
  "back_pain",
  "constipation",
  "abdominal_pain",
  "diarrhoea",
  "mild_fever",
  "yellow_urine",
  "yellowing_of_eyes",
  "acute_liver_failure",
  "fluid_overload",
  "swelling_of_stomach",
  "swelled_lymph_nodes",
  "malaise",
  "blurred_and_distorted_vision",
  "phlegm",
  "throat_irritation",
  "redness_of_eyes",
  "sinus_pressure",
  "runny_nose",
  "congestion",
  "chest_pain",
  "weakness_in_limbs",
  "fast_heart_rate",
  "pain_during_bowel_movements",
  "pain_in_anal_region",
  "bloody_stool",
  "irritation_in_anus",
  "neck_pain",
  "dizziness",
  "cramps",
  "bruising",
  "obesity",
  "swollen_legs",
  "swollen_blood_vessels",
  "puffy_face_and_eyes",
  "enlarged_thyroid",
  "brittle_nails",
  "swollen_extremities",
  "excessive_hunger",
  "extra_marital_contacts",
  "drying_and_tingling_lips",
  "slurred_speech",
  "knee_pain",
  "hip_joint_pain",
  "muscle_weakness",
  "stiff_neck",
  "swelling_joints",
  "movement_stiffness",
  "spinning_movements",
  "loss_of_balance",
  "unsteadiness",
  "weakness_of_one_body_side",
  "loss_of_smell",
  "bladder_discomfort",
  "foul_smell_of_urine",
  "continuous_feel_of_urine",
  "passage_of_gases",
  "internal_itching",
  "toxic_look_(typhos)",
  "depression",
  "irritability",
  "muscle_pain",
  "altered_sensorium",
  "red_spots_over_body",
  "belly_pain",
  "abnormal_menstruation",
  "dischromic_patches",
  "watering_from_eyes",
  "increased_appetite",
  "polyuria",
  "family_history",
  "mucoid_sputum",
  "rusty_sputum",
  "lack_of_concentration",
  "visual_disturbances",
  "receiving_blood_transfusion",
  "receiving_unsterile_injections",
  "coma",
  "stomach_bleeding",
  "distention_of_abdomen",
  "history_of_alcohol_consumption",
  "fluid_overload.1",
  "blood_in_sputum",
  "prominent_veins_on_calf",
  "palpitations",
  "painful_walking",
  "pus_filled_pimples",
  "blackheads",
  "scurring",
  "skin_peeling",
  "silver_like_dusting",
  "small_dents_in_nails",
  "inflammatory_nails",
  "blister",
  "red_sore_around_nose",
  "yellow_crust_ooze",
];

const InputSymptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [precautions, setPrecautions] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [workout, setWorkout] = useState<string[]>([]);
  const [disease, setDisease] = useState<string>("");

  const toggleSymptom = (symptom: Symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSearchTerm("");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const removeSymptom = (symptom: Symptom): void => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setShowResult(false);
    try {
      setLoading(true);
      const data = {
        symptoms: selectedSymptoms,
      };

      // console.log(data);
      const res = await axios.post(
        `${MEDICINE_RECOMMENDATION_API}/predict`,
        data
      );

      console.log(res.data);

      if (res.data) {
        setShowResult(true);
        setDescription(res.data.Description);
        setPrecautions(res.data.Precautions);
        setMedications(res.data.Medications);
        setWorkout(res.data.Workout);
        setDiets(res.data.Diets);
        setDisease(res.data["Predicted Disease"]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowResult(false);
    }
  };

  return (
    <>
      <div className="relative">
        <Label htmlFor="symptomSearch" className="text-xl font-medium">
          Select Your Symptoms
        </Label>
        <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {selectedSymptoms.map((symptom, index) => (
            <Badge key={index} className="flex items-center gap-2 px-2 py-1">
              {symptom}
              <button onClick={() => removeSymptom(symptom)} className="ml-2">
                <Image
                  src="/Images/Sidebar/close.png"
                  alt="Remove"
                  width={10}
                  height={10}
                />
              </button>
            </Badge>
          ))}
          <input
            className="flex-1 p-2 bg-white dark:bg-gray-700"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search symptoms..."
          />
        </div>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
          >
            {filteredSymptoms.map((symptom, index) => (
              <div
                key={index}
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => toggleSymptom(symptom)}
              >
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  readOnly
                  className="mr-2"
                />
                {symptom}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex mt-4 items-center justify-center">
        <Button
          disabled={loading}
          onClick={handleClick}
          className="p-3 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none  from-pink-500 to-orange-500  dark:from-blue-500 dark:to-purple-600 bg-gradient-to-br hover:bg-gradient-to-bl dark:bg-gradient-to-br"
        >
          {loading && (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </>
          )}
          Start Diagnosis
        </Button>
      </div>

      {showResult && (
        <>
          <p className="text-center mt-2 font-semibold text-3xl">
            Predicted Disease:{" "}
            <span className="font-bold bg-gradient-to-br from-pink-500 to-orange-500 dark:from-blue-500 dark:to-purple-600 text-transparent bg-clip-text">
              {" "}
              {disease}{" "}
            </span>
          </p>

          <TabsMain description={description} workout={workout} medications={medications} diets={diets} precautions={precautions} />
        </>
      )}
    </>
  );
};

export default InputSymptoms;
