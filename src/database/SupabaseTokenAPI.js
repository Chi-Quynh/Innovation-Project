
import { createClient } from '@supabase/supabase-js' //run npm install @supabase/supabase-js first

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const fetchTokens = async () => {
    let { data: Tokens, error } = await supabase
      .from('Tokens')
      .select('*');
  
    if (error) {
      console.error('Error fetching data:', error);
    } else {
        console.log('Fetched Tokens:', Tokens); // Log the fetched data for debugging
        return Tokens; // Return the fetched data
    }
  };


export default supabase;