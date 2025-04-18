
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://grvhwduipoenwztvkbxe.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdydmh3ZHVpcG9lbnd6dHZrYnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NjI3MDYsImV4cCI6MjA2MDUzODcwNn0.D_faPVGU_Re61D08H1KTLQGzX1RmwDDZXUeJH3H1oO4')
  }
})
