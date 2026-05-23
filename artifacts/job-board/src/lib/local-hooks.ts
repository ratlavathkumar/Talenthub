import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as storage from "./storage";

export function getListJobsQueryKey(params?: storage.ListJobsParams) {
  return params ? ["/api/jobs", params] : ["/api/jobs"];
}

export function getListJobApplicationsQueryKey(jobId?: number) {
  return jobId ? ["/api/jobs", jobId, "applications"] : ["/api/applications", "by-job"];
}

export function getListApplicationsQueryKey(params?: storage.ListApplicationsParams) {
  return params ? ["/api/applications", params] : ["/api/applications"];
}

export function useListJobs(
  params?: storage.ListJobsParams,
  options?: { query?: { enabled?: boolean; queryKey?: unknown[] } }
) {
  return useQuery({
    queryKey: options?.query?.queryKey ?? getListJobsQueryKey(params),
    queryFn: () => storage.getJobs(params ?? {}),
    enabled: options?.query?.enabled ?? true,
  });
}

export function useGetJob(
  id: number,
  options?: { query?: { enabled?: boolean; queryKey?: unknown[] } }
) {
  return useQuery({
    queryKey: options?.query?.queryKey ?? ["/api/jobs", id],
    queryFn: () => {
      const job = storage.getJob(id);
      if (!job) throw new Error("Job not found");
      return job;
    },
    enabled: options?.query?.enabled ?? true,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: Omit<storage.Job, "id" | "viewCount" | "applicationCount" | "createdAt"> }) =>
      Promise.resolve(storage.createJob(data)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/jobs"] });
    },
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      storage.deleteJob(id);
      return Promise.resolve();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/jobs"] });
    },
  });
}

export function useIncrementJobView() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      storage.incrementJobView(id);
      return Promise.resolve();
    },
  });
}

export function useApplyToJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: storage.CreateApplicationData }) =>
      Promise.resolve(storage.applyToJob(id, data)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/applications"] });
      qc.invalidateQueries({ queryKey: ["/api/jobs"] });
    },
  });
}

export function useListJobApplications(
  jobId: number,
  options?: { query?: { enabled?: boolean; queryKey?: unknown[] } }
) {
  return useQuery({
    queryKey: options?.query?.queryKey ?? getListJobApplicationsQueryKey(jobId),
    queryFn: () => storage.getApplications({ jobId }),
    enabled: options?.query?.enabled ?? true,
  });
}

export function useListApplications(
  params?: storage.ListApplicationsParams,
  options?: { query?: { enabled?: boolean; queryKey?: unknown[] } }
) {
  return useQuery({
    queryKey: options?.query?.queryKey ?? getListApplicationsQueryKey(params),
    queryFn: () => storage.getApplications(params ?? {}),
    enabled: options?.query?.enabled ?? true,
  });
}

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { status: string } }) =>
      Promise.resolve(storage.updateApplicationStatus(id, data.status)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/applications"] });
    },
  });
}

export function useGetStatsSummary(
  options?: { query?: { enabled?: boolean } }
) {
  return useQuery({
    queryKey: ["/api/stats/summary"],
    queryFn: () => Promise.resolve(storage.getStatsSummary()),
    enabled: options?.query?.enabled ?? true,
  });
}

export function useGetApplicationsOverTime(
  options?: { query?: { enabled?: boolean } }
) {
  return useQuery({
    queryKey: ["/api/stats/applications-over-time"],
    queryFn: () => Promise.resolve(storage.getApplicationsOverTime()),
    enabled: options?.query?.enabled ?? true,
  });
}

export function useGetStatsByCategory(
  options?: { query?: { enabled?: boolean } }
) {
  return useQuery({
    queryKey: ["/api/stats/by-category"],
    queryFn: () => Promise.resolve(storage.getStatsByCategory()),
    enabled: options?.query?.enabled ?? true,
  });
}
