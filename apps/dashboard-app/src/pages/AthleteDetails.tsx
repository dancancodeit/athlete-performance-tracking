// src/pages/AthleteDetails.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonText,
} from "@ionic/react";
import { useAthleteContext } from "../context/AthleteContext";
import axiosInstance from "../utils/axiosInstance"; // Import the Axios instance
import SharedHeader from "../components/SharedHeader";
import { useHistory } from 'react-router-dom';

const AthleteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { deleteAthlete, addMetric } = useAthleteContext();
  const [metricType, setMetricType] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [metricUnit, setMetricUnit] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const history = useHistory();

  // Fetch athlete details
  const {
    data: athlete,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["athlete", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/athletes/${id}`);
      return response.data;
    },
  });

  const handleDeleteAthlete = () => {
    deleteAthlete(athlete.id);
    history.push('/'); // Navigate to the home page
  }

  // Handle form submission
  const handleAddMetric = async () => {
    if (!metricType || !metricValue || !metricUnit) {
      setFormError("All fields are required.");
      return;
    }

    // Convert value to a float
    const value = parseFloat(metricValue);
    if (isNaN(value)) {
      setFormError("Metric value must be a number.");
      return;
    }

    try {
      await addMetric(id, {
        type: metricType,
        unit: metricUnit,
        value,
      });
      // Clear form and error state after submission
      setMetricType("");
      setMetricValue("");
      setMetricUnit("");
      setFormError(null);
    } catch (error) {
      setFormError("Failed to add metric.");
    }
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading athlete details...</div>;
  if (error || !athlete) return <div>Error loading athlete details.</div>;

  return (
    <IonPage>
      <IonHeader>
        <SharedHeader
          title={`${athlete.name}'s Performance Metrics`}
          showHomeButton
        />
      </IonHeader>
      <IonContent>
        <IonList>
          {athlete.metrics.map((metric: any) => (
            <IonItem key={metric.id}>
              <IonLabel>
                <h2>{metric.metricType}</h2>
                <p>Value: {metric.value}</p>
                <p>Unit: {metric.unit}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Metric form */}
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Metric Type</IonLabel>
            <IonInput
              value={metricType}
              onInput={(e: any) => setMetricType(e.target.value)}
              placeholder="e.g., Speed"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Metric Value</IonLabel>
            <IonInput
              type="number"
              value={metricValue}
              onInput={(e: any) => setMetricValue(e.target.value)}
              placeholder="e.g., 20"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Metric Unit</IonLabel>
            <IonInput
              value={metricUnit}
              onInput={(e: any) => setMetricUnit(e.target.value)}
              placeholder="e.g., kg"
            />
          </IonItem>

          {formError && (
            <IonText color="danger">
              <p>{formError}</p>
            </IonText>
          )}
        </IonList>

        <IonButton onClick={handleAddMetric}>Add Metric</IonButton>

        <IonButton color="danger" onClick={handleDeleteAthlete}>
          Delete Athlete
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AthleteDetails;
