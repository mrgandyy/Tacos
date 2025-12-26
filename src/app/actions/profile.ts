'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const bio = formData.get('bio') as string
    const genres = (formData.get('genres') as string).split(',').map(g => g.trim()).filter(Boolean)
    const discord = formData.get('discord') as string
    const twitter = formData.get('twitter') as string
    const vrcParams = formData.get('vrcParams') as string

    const socials = {
        discord,
        twitter,
        vrcParams
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            bio,
            genres,
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
