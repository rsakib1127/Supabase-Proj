const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://vzndqxsbblpqkynmqjgd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey, {
  global: { fetch: fetch.bind(globalThis) }
})

const Table = "Users"

async function getUser(userData) {
  try {
    const db = await connectDB();
    let { data, error } = await supabase
      .from('Users')
      .select('*')
    if (error) {
      return { error: true, data: [], errorMessage: "Data Not Found" };
    }
    else {
      return { error: false, data: data, errorMessage: "Success" };
    }
  } catch (error) {
    console.error(error);
    return { error: true, data: null, errorMessage: `Insert failed: ${error.message}` };
  }
}


async function insert(userData) {
  try {
    const { data, error } = await supabase
      .from(Table)
      .insert([
        userData,
      ])
      .select()
    if (error) {
      return { error: true, data: [], errorMessage: "User adding failed" };
    }
    else {
      return { error: false, data: data, errorMessage: "Success" };
    }
  } catch (error) {
    console.error(error);
    return { error: true, data: null, errorMessage: `Insert failed: ${error.message}` };
  }
}


module.exports = {
  getUser,
  insert,
};