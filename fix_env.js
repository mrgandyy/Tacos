const fs = require('fs');
const content = `NEXT_PUBLIC_SUPABASE_URL=https://ayssgeurubteacqqnvki.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5c3NnZXVydWJ0ZWFjcXFudmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NjMwNTYsImV4cCI6MjA4MjMzOTA1Nn0.v9LSu8Gq1kpo0Ug7KQ6EhlJHiLqu2ed1vtyv5zv8RQM
`;
fs.writeFileSync('.env.local', content, { encoding: 'utf8' });
console.log('.env.local written successfully');
