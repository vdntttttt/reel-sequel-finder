
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check for missing environment variables and log a more helpful error message
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(`
    Missing Supabase environment variables!
    
    Make sure to set these in your environment or in a .env file:
    - VITE_SUPABASE_URL
    - VITE_SUPABASE_ANON_KEY
    
    You can find these values in your Supabase project settings under API.
  `);
}

// Modified client creation to handle initialization even when variables are missing
// This prevents the app from crashing completely, though functionality will be limited
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Helper to get the current user with additional error handling
export const getCurrentUser = async () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null; // Return null instead of throwing if not configured
    }
    
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
