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

    const { error } = await supabase
        .from('profiles')
        .update({
            role: 'applicant',
            application_status: 'pending',
            application_type: type,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

    if (error) {
        console.error('Application error:', error)
        throw new Error('Failed to submit application')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
