// src/pages/EditAthlete.tsx

import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonInput,
  IonPage,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useAthleteContext } from "../context/AthleteContext";
import SharedHeader from "../components/SharedHeader";

const UpdateAthlete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { updateAthlete } = useAthleteContext();
  const history = useHistory();

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [team, setTeam] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch athlete details for editing
  const { data: athlete, isLoading, error } = useQuery({
    queryKey: ["athlete", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/athletes/${id}`);
      return response.data;
    },
  });
  
  useEffect(() => {
    if (athlete) {
      setName(athlete.name);
      setAge(athlete.age);
      setTeam(athlete.team);
    }
  }, [athlete]);

  const handleSubmit = async () => {
    if (!name || !age || !team) {
      setFormError("Please fill in all fields.");
      return;
    }

    const updatedAthlete = {
      id,
      name,
      age: Number(age),
      team,
    };

    try {
      await updateAthlete(updatedAthlete); // Assuming updateAthlete is defined in your context
      history.push(`/athlete-details/${id}`); // Navigate back to athlete details page
    } catch (error) {
      setFormError("Failed to update athlete.");
    }
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading athlete data...</div>;
  if (error || !athlete) return <div>Error loading athlete data.</div>;

  return (
    <IonPage>
      <SharedHeader title="Edit Athlete" showHomeButton={true} />
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              value={name}
              onInput={(e) => setName((e.target as unknown as HTMLInputElement).value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Age</IonLabel>
            <IonInput
              type="number"
              value={age}
              onInput={(e) => setAge(Number((e.target as unknown as HTMLInputElement).value))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Team</IonLabel>
            <IonInput
              value={team}
              onInput={(e) => setTeam((e.target as unknown as HTMLInputElement).value)}
            />
          </IonItem>

          {formError && (
            <IonText color="danger">
              <p>{formError}</p>
            </IonText>
          )}

          <IonButton expand="block" onClick={handleSubmit}>
            Save Changes
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UpdateAthlete;
