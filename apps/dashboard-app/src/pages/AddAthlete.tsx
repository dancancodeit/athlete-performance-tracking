// src/pages/AddAthlete.tsx

import React, { useState } from 'react';
import {
  IonContent,
  IonInput,
  IonPage,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
} from '@ionic/react';
import { useAthleteContext } from '../context/AthleteContext';
import SharedHeader from '../components/SharedHeader';
import { useHistory } from 'react-router';

const AddAthlete: React.FC = () => {
  const { addAthlete } = useAthleteContext();
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [team, setTeam] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    if (!name || !age || !team) {
      alert('Please fill in all fields');
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
    history.push('/');
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
              onInput={(e: any) => setName(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Age</IonLabel>
            <IonInput
              value={age}
              type="number"
              onInput={(e: any) => setAge(Number(e.target.value))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Team</IonLabel>
            <IonInput
              value={team}
              onInput={(e: any) => setTeam(e.target.value)}
            />
          </IonItem>

          <IonButton onClick={handleSubmit}>Save Athlete</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddAthlete;
