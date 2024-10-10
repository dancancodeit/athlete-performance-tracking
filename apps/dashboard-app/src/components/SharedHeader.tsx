// src/components/SharedHeader.tsx

import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface SharedHeaderProps {
  title: string;
  showHomeButton?: boolean;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  title,
  showHomeButton,
}) => {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push('/'); // Navigate to the home page
  };

  return (
    <IonHeader>
      <IonToolbar>
        {showHomeButton && (
          <IonButtons slot="start">
            <IonButton onClick={handleHomeClick}>Home</IonButton>
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default SharedHeader;
