'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitApplication(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const type = formData.get('type') as 'dj' | 'partner'
    if (!['dj', 'partner'].includes(type)) {
        throw new Error('Invalid application type')
    }

    // Extract extended profile data
    const bio = formData.get('bio') as string
    const genresRaw = formData.get('genres') as string
    const genres = genresRaw ? genresRaw.split(',').map(g => g.trim()).filter(Boolean) : []

    // Socials
    const soundcloud = formData.get('soundcloud') as string
    const twitter = formData.get('twitter') as string
    const discord = formData.get('discord') as string
    const vrc = formData.get('vrc') as string

    const socials = {
        soundcloud,
        twitter,
        discord,
        vrc
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            role: 'applicant',
            application_status: 'pending',
            application_type: type,
            bio: bio,
            genres: genres,
            socials: socials,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

    // If partner, ensure they have a group placeholder or handle it in dashboard
    if (type === 'partner') {
        // We do NOT create a group here because we don't have the name yet.
        // The user flow expects them to create it later?
        // Issue: "Pending" on user side might actally mean "Profile Pending".
    }

    if (error) {
        console.error('Application error:', error)
        throw new Error('Failed to submit application')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
