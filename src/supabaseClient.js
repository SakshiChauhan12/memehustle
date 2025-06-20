import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rcnifjarvjadkmlwufgu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbmlmamFydmphZGttbHd1Zmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjQyNDgsImV4cCI6MjA2NTgwMDI0OH0.dVpbMEEiBaXnEmv8EakT9SDH8so4NhV4MR3LXww_er4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
