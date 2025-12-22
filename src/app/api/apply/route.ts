import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate fields
        if (!body.name || !body.discord || !body.role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // In a real app, this would send an email via Resend or save to DB.
        // For now, we log it to the build logs (which would show up in Vercel logs).
        console.log('--- NEW STAFF APPLICATION ---');
        console.log('Name:', body.name);
        console.log('Discord:', body.discord);
        console.log('Role:', body.role);
        console.log('Experience:', body.experience);
        console.log('Availability:', body.availability);
        console.log('-----------------------------');

        return NextResponse.json({ success: true, message: 'Application received' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
