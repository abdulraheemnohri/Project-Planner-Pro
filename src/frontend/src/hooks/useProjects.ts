import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Project {
  id: number;
  name: string;
  description: string;
  key: string;
  status: string;
  start_date: string;
  end_date: string;
}

interface CreateProjectData {
  name: string;
  description?: string;
  key?: string;
}

export function useProjects() {
  const queryClient = useQueryClient();

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });

  const { mutate: createProject } = useMutation({
    mutationFn: async (data: CreateProjectData) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create project");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });

  return {
    projects,
    isLoading,
    error,
    createProject,
  };
}