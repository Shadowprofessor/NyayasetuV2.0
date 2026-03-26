import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const SALT_ROUNDS = 12;

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl!, supabaseServiceKey!, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const hash = await bcrypt.hash('Officer@123', SALT_ROUNDS);
  const { data, error } = await supabase
    .from('users')
    .update({ password_hash: hash })
    .in('email', ['officer2@nyayasetu.in', 'officer@nyayasetu.in'])
    .select('id, email');
  
  if (error) console.error(error);
  else console.log('Updated passwords for:', data);
}
main();
