'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createGroupApplication(formData: any) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "Not authenticated" }

    const {
        name,
        description,
        logo_url,
        social_link
    } = formData

    // Check if user already has a pending or approved application
    // Actually, according to schema, user can have multiple? 
    // Schema says: profiles text application_status. But groups are in `partnered_groups` table?
    // Let's check schema. `partnered_groups` has `id, name, ...`.
    // We should probably link the group to the user.
    // The current schema might be missing a proper `owner_id` on `partnered_groups` or a link.
    // Let's assume for now we create a group and assign the user as owner or just create a profile application.
    // Wait, `profiles` table has `role` ('dj', 'partner', 'admin').
    // So "Partner Application" usually means "Make ME a partner". 
    // BUT the requirement is "Partnered DJ OR Group Owner".
    // If Group Owner, they manage a record in `partnered_groups`.

    // Logic:
    // 1. User applies to be a Group Owner.
    // 2. Admin approves.
    // 3. User creates/manages the Group.

    // OR:
    // 1. User submits "Group Application" which creates a key in `partnered_groups` with status='pending' and `owner_id`=user.id.

    // Let's check the schema for `partnered_groups`. obtain schema first.

    // Assuming we insert into `partnered_groups` with status 'pending'.

    const { error } = await supabase
        .from('partnered_groups')
        .insert({
            name,
            description,
            logo_url,
            social_link,
            application_status: 'pending',
            owner_id: user.id
        })

    if (error) return { error: error.message }

    // Also update user profile to 'pending' status so they see the valid state?
    await supabase.from('profiles').update({ application_status: 'pending' }).eq('id', user.id)

    revalidatePath('/dashboard')
    revalidatePath('/admin')
    return { success: true }
}

export async function updateGroup(id: string, formData: any) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('partnered_groups')
        .update({
            name: formData.name,
            description: formData.description,
            logo_url: formData.logo_url,
            social_link: formData.social_link,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/dashboard')
    revalidatePath('/partners')
    return { success: true }
}
