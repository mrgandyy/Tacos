import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate fields
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Tacos Nightlife Contact <contact@resend.dev>',
            to: ['itstwerktaco@gmail.com'], // Send to the same admin email
            replyTo: email, // Allow replying directly to the sender
            subject: `New Contact Inquiry: ${name}`,
            html: `
                <h1>New Contact Inquiry</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr />
                <h3>Message</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
