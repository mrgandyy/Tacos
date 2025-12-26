-- Seed Partnered Groups
INSERT INTO partnered_groups (id, name, description, logo_url, social_link, application_status, is_featured)
VALUES 
    (gen_random_uuid(), 'Neon Gardens', 'A cyberpunk botanical garden club focusing on ambient and trance.', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop', 'https://discord.gg/example', 'approved', true),
    (gen_random_uuid(), 'The Basement', 'Underground techno bunker. Dark, loud, and intense.', 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1000&auto=format&fit=crop', 'https://discord.gg/example', 'approved', false),
    (gen_random_uuid(), 'Cloud9 Lounge', 'Chill vibes and lo-fi beats in the clouds.', 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop', 'https://discord.gg/example', 'approved', true)
ON CONFLICT DO NOTHING;

-- Seed Events
-- We need to look up group IDs, but for a simple seed script we can use CTEs or just dynamic values if we weren't using hardcoded UUIDs above.
-- To keep it simple for the user to run, we'll just insert events with NULL host_group_id or try to link them if we knew the IDs.
-- Let's just insert generic events.

INSERT INTO events (title, start_time, end_time, description, image_url, timezone, is_nsfw)
VALUES
    ('System Reboot', NOW() + interval '1 day', NOW() + interval '1 day' + interval '4 hours', 'Weekly reset party.', 'https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1000&auto=format&fit=crop', 'EST', false),
    ('Bass Protocol', NOW() + interval '3 days', NOW() + interval '3 days' + interval '5 hours', 'Heavy bass music night.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop', 'PST', false),
    ('Retro Wave', NOW() - interval '2 days', NOW() - interval '2 days' + interval '3 hours', 'Synthwave classics.', 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop', 'EST', false);
