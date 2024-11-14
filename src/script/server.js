import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cwzublqhsivtyqhkrbur.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch data
export async function getData(table_name) {
  const { data, error } = await supabase
    .from(table_name) // Replace 'users' with your table name
    .select("*"); // Adjust the query as needed

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Fetched data:", data);
  }
}
