
import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase URL and anon key
const supabaseUrl = 'https://grvhwduipoenwztvkbxe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdydmh3ZHVpcG9lbnd6dHZrYnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NjI3MDYsImV4cCI6MjA2MDUzODcwNn0.D_faPVGU_Re61D08H1KTLQGzX1RmwDDZXUeJH3H1oO4';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get the current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
