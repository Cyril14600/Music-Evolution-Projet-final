import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, date, eventType, rating, message } = body;

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
