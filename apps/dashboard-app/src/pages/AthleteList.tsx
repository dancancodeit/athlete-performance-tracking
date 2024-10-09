// src/pages/AthleteList.tsx

import React from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonPage,
  IonContent,
} from "@ionic/react";
import { useAthleteContext } from "../context/AthleteContext";
import SharedHeader from "../components/SharedHeader"; // Import the shared header

const AthleteList: React.FC = () => {
  const { athletes } = useAthleteContext();

  return (
    <IonPage>
      <SharedHeader title="Athlete List" /> {/* No home button needed */}
      <IonContent>
        <IonList>
          {athletes.map((athlete) => (
            <IonItem key={athlete.id}>
              <IonLabel>
                <h2>{athlete.name}</h2>
                <p>Age: {athlete.age}</p>
                <p>Team: {athlete.team}</p>
              </IonLabel>
              <IonButton routerLink={`/athlete-details/${athlete.id}`}>
                View Details
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" routerLink="/add-athlete">
          Add New Athlete
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AthleteList;
