'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const bio = formData.get('bio') as string
    const genres = (formData.get('genres') as string).split(',').map(g => g.trim()).filter(Boolean)
    const avatar_url = formData.get('avatar_url') as string

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
            bio,
            genres,
            avatar_url,
            socials,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) throw new Error('Failed to update profile')

    revalidatePath('/dashboard')
}

export async function toggleVisibility(isVisible: boolean) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase
        .from('profiles')
        .update({
            is_visible: isVisible,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) throw new Error('Failed to update visibility')

    revalidatePath('/dashboard')
}
