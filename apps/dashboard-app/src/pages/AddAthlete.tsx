// src/pages/AddAthlete.tsx

import React, { useState } from "react";
import {
  IonContent,
  IonInput,
  IonPage,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/react";
import { useAthleteContext } from "../context/AthleteContext";
import SharedHeader from "../components/SharedHeader";

const AddAthlete: React.FC = () => {
  const { addAthlete } = useAthleteContext();
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [team, setTeam] = useState("");

  const handleSubmit = () => {
    if (!name || !age || !team) {
      alert("Please fill in all fields");
      return;
    }

    const newAthlete = {
      id: Math.random(),
      name,
      age: Number(age),
      team,
      metrics: [],
    };

    addAthlete(newAthlete);
    alert("Athlete added successfully!");
  };

  return (
    <IonPage>
      <SharedHeader title="Add Athlete" showHomeButton={true} />
      <IonContent>
        <IonList>
          <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
          <IonLabel position="stacked">Age</IonLabel>
            <IonInput
              value={age}
              type="number"
              onIonChange={(e) => setAge(Number(e.detail.value!))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Team</IonLabel>
            <IonInput
              value={team}
              onIonChange={(e) => setTeam(e.detail.value!)}
            />
          </IonItem>

          <IonButton onClick={handleSubmit}>Save Athlete</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddAthlete;
