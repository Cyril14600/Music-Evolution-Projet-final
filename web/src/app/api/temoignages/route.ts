import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const date = formData.get('date') as string;
        const eventType = formData.get('eventType') as string;
        const rating = formData.get('rating') as string;
        const message = formData.get('message') as string;
        const photo = formData.get('photo') as File | null;

        // Simple Validation
        if (!firstName || !lastName || !email || !message || !rating) {
            return NextResponse.json(
                { error: 'Tous les champs obligatoires sont requis.' },
                { status: 400 }
            );
        }

        const emailContent = `
      Nouveau témoignage reçu !
      
      Client: ${firstName} ${lastName}
      Email: ${email}
      Événement: ${eventType} (${date})
      Note: ${rating}/5 ⭐
      
      Témoignage:
      "${message}"

    `;

        let attachments = [];
        if (photo && photo.size > 0 && photo.name) {
            const buffer = Buffer.from(await photo.arrayBuffer());
            attachments.push({
                filename: photo.name,
                content: buffer,
            });
        }

        console.log('--- PRÉPARATION ENVOI TÉMOIGNAGE GMAIL ---');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: `"MusicEvolution14 Avis" <${process.env.GMAIL_USER}>`,
            to: 'musicevolution144@gmail.com',
            replyTo: email,
            subject: `Nouveau Témoignage: ${rating}/5 de ${firstName} ${lastName}`,
            text: emailContent,
            attachments: attachments,
        });

        console.log('--- TÉMOIGNAGE ENVOYÉ ---');

        return NextResponse.json({ success: true, message: 'Témoignage envoyé avec succès !' });

    } catch (error: any) {
        console.error('Erreur API Témoignages:', error);
        return NextResponse.json(
            { error: "Erreur lors de l'envoi: " + error.message },
            { status: 500 }
        );
    }
}
