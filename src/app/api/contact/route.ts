import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'akashsinghp10@gmail.com',
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0d0d18; color: #e5e5f0; border-radius: 12px;">
          <h2 style="color: #8b5cf6; margin-top: 0;">New message from your portfolio</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #9999aa; width: 80px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9999aa;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></td>
            </tr>
            ${subject ? `<tr><td style="padding: 8px 0; color: #9999aa;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>` : ''}
          </table>
          <div style="background: #1a1a2e; padding: 16px; border-radius: 8px; border-left: 3px solid #8b5cf6;">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #555566; font-size: 12px; margin-top: 24px; margin-bottom: 0;">
            Sent via your portfolio contact form. Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
