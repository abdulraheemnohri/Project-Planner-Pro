import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Sprint {
  id: number;
  name: string;
  description: string;
  goal: string;
  status: string;
  start_date: string;
  end_date: string;
  project_id: number;
}

interface CreateSprintData {
  name: string;
  goal?: string;
  project_id?: number;
  duration_days?: number;
}

export function useSprints(projectId?: number) {
  const queryClient = useQueryClient();

  const { data: sprints, isLoading, error } = useQuery<Sprint[]>({
    queryKey: ["sprints", projectId],
    queryFn: async () => {
      let url = "/api/sprints";
      if (projectId) url += "?project_id=" + projectId;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch sprints");
      return response.json();
    },
  });

  const { mutate: createSprint } = useMutation({
    mutationFn: async (data: CreateSprintData) => {
      const response = await fetch("/api/sprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create sprint");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sprints"] });
      toast.success("Sprint created successfully!");
    },
    onError: () => {
      toast.error("Failed to create sprint");
    },
  });

  return {
    sprints,
    isLoading,
    error,
    createSprint,
  };
}