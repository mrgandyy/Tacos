'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEvent(formData: any) {
    const supabase = await createClient()

    // Basic validation could go here

    // Transform slots to ensure they have IDs if needed, or clean data
    // Assuming formData comes in as a clean object ready for insertion
    // but in a real app we'd parse FormData. 
    // For simplicity with complex nested data (slots), we'll assume the client 
    // sends a JSON payload or we bind to a server action that takes a plain object.

    // We will use a pattern where the client component calls this action 
    // with a structured object, not just raw FormData, strictly for the complex nested arrays.

    const {
        title,
        description,
        start_time,
        end_time,
        venue_id, // "clubs" in the screenshot, likely mapping to our partner groups or just text if external? 
        // For now, let's stick to our schema: host_group_id or host_profile_id
        host_group_id,
        host_profile_id,
        is_nsfw,
        is_age_gated,
        instance_open_before_minutes,
        announcement_url,
        timezone,
        tags,
        slots,
        image_url,
        co_hosts
    } = formData

    const { data, error } = await supabase
        .from('events')
        .insert({
            title,
            description,
            start_time,
            end_time,
            host_group_id,
            host_profile_id,
            image_url,
            is_nsfw,
            is_age_gated,
            instance_open_before_minutes,
            announcement_url,
            timezone,
            tags,
            slots,
            co_hosts
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating event:', error)
        return { error: error.message }
    }

    revalidatePath('/events')
    revalidatePath('/admin/events')
    return { success: true, eventId: data.id }
}

export async function updateEvent(id: string, formData: any) {
    const supabase = await createClient()

    const {
        title,
        description,
        start_time,
        end_time,
        host_group_id,
        image_url,
        is_nsfw,
        is_age_gated,
        instance_open_before_minutes,
        announcement_url,
        timezone,
        tags,
        slots,
        co_hosts
    } = formData

    const { error } = await supabase
        .from('events')
        .update({
            title,
            description,
            start_time,
            end_time,
            host_group_id,
            image_url,
            is_nsfw,
            is_age_gated,
            instance_open_before_minutes,
            announcement_url,
            timezone,
            tags,
            slots,
            co_hosts,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating event:', error)
        return { error: error.message }
    }

    revalidatePath('/events')
    revalidatePath('/admin/events')
    return { success: true }
}

export async function deleteEvent(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('events').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/events')
    revalidatePath('/admin/events')
    return { success: true }
}
