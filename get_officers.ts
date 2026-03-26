import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl!, supabaseServiceKey!, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: officers, error: offErr } = await supabase.from('officers').select('*');
  if (offErr) { console.error('Error fetching officers:', offErr); return; }
  
  const { data: users, error: userErr } = await supabase.from('users').select('id, email, full_name, role');
  if (userErr) { console.error('Error fetching users:', userErr); return; }

  console.log('--- Officers ---');
  console.log(officers);

  console.log('\n--- Users ---');
  console.log(users);
}
main();
