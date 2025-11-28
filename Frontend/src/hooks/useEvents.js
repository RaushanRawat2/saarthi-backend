/*
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// -------------------------
// Fetch ALL events
// -------------------------
export const useEvents = (filters = {}) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      const res = await axios.get("/api/events", { params: filters });
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// -------------------------
// Fetch a SINGLE event
// -------------------------
export const useEvent = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axios.get(`/api/events/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// -------------------------
// Event Availability
// -------------------------
export const useEventAvailability = (id) => {
  return useQuery({
    queryKey: ["availability", id],
    queryFn: async () => {
      const res = await axios.get(`/api/events/${id}/availability`);
      return res.data;
    },
    enabled: !!id,
    refetchInterval: 30000, // 30 seconds
  });
};

// -------------------------
// Create Booking
// -------------------------
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      const res = await axios.post("/api/bookings", bookingData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Booking created successfully!");

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
    onError: () => {
      toast.error("Failed to create booking");
    },
  });
};
*/



import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useEvents = (filters = {}) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      const res = await axios.get('/api/events', { params: filters });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useEvent = (id) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await axios.get(`/api/events/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useEventAvailability = (id) => {
  return useQuery({
    queryKey: ['availability', id],
    queryFn: async () => {
      const res = await axios.get(`/api/events/${id}/availability`);
      return res.data;
    },
    enabled: !!id,
    refetchInterval: 30000,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      const res = await axios.post('/api/bookings', bookingData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      toast.success("Booking created successfully!");
    },
  });
};
