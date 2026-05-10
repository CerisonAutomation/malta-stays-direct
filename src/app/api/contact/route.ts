import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    const typeLabels: Record<string, string> = {
      guest: 'Guest Enquiry',
      owner: 'Property Owner Enquiry',
      other: 'General Enquiry',
    };
    const subject = typeLabels[type] ?? 'New Contact Enquiry';

    // Send notification to business
    await resend.emails.send({
      from: 'Malta Stays Direct <noreply@maltastaysdirect.com>',
      to: ['info@christianopropertymanagement.com'],
      subject: `[${subject}] from ${name}`,
      html: `
        <h2>${subject}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #d97706;padding-left:1rem;color:#374151">${message.replace(/\n/g, '<br>')}</blockquote>
      `,
    });

    // Send auto-reply to sender
    await resend.emails.send({
      from: 'Christiano Property Management <noreply@maltastaysdirect.com>',
      to: [email],
      subject: 'We received your message',
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We have received your message and will get back to you within <strong>2 hours</strong> during business hours (Mon&ndash;Sun, 8am&ndash;8pm CET).</p>
        <p>If your enquiry is urgent, please call or WhatsApp us directly at <strong>+356 7979 0202</strong>.</p>
        <p>Warm regards,<br/>The Christiano Property Management Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/contact]', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
