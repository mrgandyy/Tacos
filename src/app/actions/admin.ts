'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function manageApplication(userId: string, status: 'approved' | 'rejected') {
    const supabase = await createClient()

    // Verify Admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (adminProfile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin only')
    }

    // Update Status & Role
    // If approved, set role to 'dj' or 'partner' based on application_type
    // If rejected, set role back to 'public' or keep as 'applicant'?? 
    // Let's keep them as applicant but status rejected for now.

    const updates: any = {
        application_status: status,
        updated_at: new Date().toISOString()
    }

    if (status === 'approved') {
        // We need to know the application type to set the role correctly
        // So we first fetch the target user profile
        const { data: targetProfile } = await supabase
            .from('profiles')
            .select('application_type')
            .eq('id', userId)
            .single()

        if (targetProfile?.application_type === 'dj') {
            updates.role = 'dj'
            updates.is_visible = true // Auto-visible on approval? Maybe let them toggle it.
        } else if (targetProfile?.application_type === 'partner') {
            updates.role = 'partner'
            // Create a partner group placeholder if it doesn't exist?
            // For now just set the role.
        }
    }

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)

    if (error) throw new Error('Failed to update application')

    revalidatePath('/admin')
}

export async function getUsers() {
    const supabase = await createClient()

    // Verify Admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (adminProfile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin only')
    }

    const { data: users, error } = await supabase
        .from('profiles')
        .select(`
            *,
            partnered_groups (
                id,
                name,
                application_status
            )
        `)
        .order('username', { ascending: true })

    if (error) throw new Error(error.message)
    return users
}

export async function updateUserRole(userId: string, role: string) {
    const supabase = await createClient()

    // Verify Admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (adminProfile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin only')
    }

    const { error } = await supabase
        .from('profiles')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('id', userId)

    if (error) throw new Error('Failed to update role')
    revalidatePath('/admin')
}

export async function deleteUserProfile(userId: string) {
    const supabase = await createClient()

    // Verify Admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (adminProfile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin only')
    }

    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

    if (error) throw new Error('Failed to delete profile')
    revalidatePath('/admin')
}

export async function manageGroupApplication(groupId: string, status: 'approved' | 'rejected') {
    const supabase = await createClient()

    // Verify Admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: adminProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (adminProfile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin only')
    }

    const { error } = await supabase
        .from('partnered_groups')
        .update({
            application_status: status,
            updated_at: new Date().toISOString()
        })
        .eq('id', groupId)

    if (error) throw new Error('Failed to update group application')

    revalidatePath('/admin')
    revalidatePath('/partners')
}
