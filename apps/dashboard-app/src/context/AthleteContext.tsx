import React, { createContext, useContext, useMemo } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define interfaces
interface Metric {
  id: string;
  type: string;
  value: number;
  unit: string;
}

interface Athlete {
  id: string;
  name: string;
  age: number;
  team: string;
  metrics: Metric[];
}

interface AthleteContextType {
  athletes: Athlete[];
  addAthlete: (athlete: Omit<Athlete, "id">) => Promise<void>;
  deleteAthlete: (id: string) => Promise<void>;
  addMetric: (athleteId: string, metric: Omit<Metric, "id">) => Promise<void>;
}

// Create the context
const AthleteContext = createContext<AthleteContextType | undefined>(undefined);


export const AthleteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  // Fetch all athletes
  const { data: athletes = [] } = useQuery<Athlete[]>({
    queryKey: ["athletes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/athletes");
      return response.data;
    },
  });

  // Mutation for adding an athlete
  const addAthleteMutation = useMutation({
    mutationFn: async (athlete: Omit<Athlete, "id">) => {
      await axiosInstance.post("/athletes", athlete);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["athletes"], // Assume metrics are queried under this queryKey
        refetchType: "all",
      });
    },
  });

  // Mutation for deleting an athlete
  const deleteAthleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/athletes/${id}`);
    },
    onSuccess: (data, {}) => {
      queryClient.invalidateQueries({
        queryKey: ["athletes"], 
        refetchType: "all",
      });
    },
  });

  // Mutation for adding a metric
  const addMetricMutation = useMutation({
    mutationFn: async ({
      athleteId,
      metric,
    }: {
      athleteId: string;
      metric: Omit<Metric, "id">;
    }) => {
      await axiosInstance.post(`/athletes/${athleteId}/metrics`, metric);
    },
    onSuccess: (data, { athleteId }) => {
      // Instead of invalidating the whole athletes list, only invalidate the specific athlete's data
      queryClient.invalidateQueries({
        queryKey: ['athlete', athleteId],
        refetchType: "all",
      });
    },
  });

  // Expose methods through the context
  const value = useMemo(
    () => ({
      athletes,
      addAthlete: (athlete: Omit<Athlete, "id">) =>
        addAthleteMutation.mutateAsync(athlete),
      deleteAthlete: (id: string) => deleteAthleteMutation.mutateAsync(id),
      addMetric: (athleteId: string, metric: Omit<Metric, "id"|"date">) =>
        addMetricMutation.mutateAsync({ athleteId, metric }),
    }),
    [athletes, addAthleteMutation, deleteAthleteMutation, addMetricMutation]
  );

  return (
    <AthleteContext.Provider value={value}>{children}</AthleteContext.Provider>
  );
};

// Custom hook to use the AthleteContext
export const useAthleteContext = () => {
  const context = useContext(AthleteContext);
  if (!context) {
    throw new Error("useAthleteContext must be used within an AthleteProvider");
  }
  return context;
};
