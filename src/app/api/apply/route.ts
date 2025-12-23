import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const body = await request.json();

        // Validate fields
        if (!body.name || !body.discord || !body.role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { name, discord, role, experience, availability } = body;

        const data = await resend.emails.send({
            from: 'Tacos Nightlife <onboarding@resend.dev>', // Use default testing domain or user's domain if configured
            to: ['itstwerktaco@gmail.com'],
            subject: `New Staff Application: ${name} - ${role}`,
            html: `
                <h1>New Staff Application</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Discord:</strong> ${discord}</p>
                <p><strong>Role Interested In:</strong> ${role}</p>
                <hr />
                <h3>Experience</h3>
                <p>${experience || 'N/A'}</p>
                <h3>Availability</h3>
                <p>${availability || 'N/A'}</p>
            `,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Application received' });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
