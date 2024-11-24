import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://ovhtfezsgbsmkdcvgtdc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aHRmZXpzZ2JzbWtkY3ZndGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0ODU2NjIsImV4cCI6MjA0ODA2MTY2Mn0.1LX8IhYelZwOVq2dw7DLJL5hu0FVBQT0a_9eqcpwQ2U';

export const supabase = createClient(supabaseUrl, supabaseKey);