import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface Issue {
  id: number;
  number: number;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  story_points?: number;
  project_id: number;
  sprint_id?: number;
  created_by_id: number;
  assigned_to_id?: number;
}

interface CreateIssueData {
  title: string;
  description?: string;
  type?: string;
  priority?: string;
  project_id?: number;
  sprint_id?: number;
}

export function useIssues(projectId?: number) {
  const queryClient = useQueryClient();

  const { data: issues, isLoading, error } = useQuery<Issue[]>({
    queryKey: ["issues", projectId],
    queryFn: async () => {
      let url = "/api/issues";
      if (projectId) url += "?project_id=" + projectId;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch issues");
      return response.json();
    },
  });

  const { mutate: createIssue } = useMutation({
    mutationFn: async (data: CreateIssueData) => {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create issue");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toast.success("Issue created successfully!");
    },
    onError: () => {
      toast.error("Failed to create issue");
    },
  });

  const { mutate: updateIssueStatus } = useMutation({
    mutationFn: async ({ issueId, status }: { issueId: number; status: string }) => {
      const response = await fetch("/api/issues/" + issueId + "/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update issue status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
    onError: () => {
      toast.error("Failed to update issue status");
    },
  });

  return {
    issues,
    isLoading,
    error,
    createIssue,
    updateIssueStatus,
  };
}