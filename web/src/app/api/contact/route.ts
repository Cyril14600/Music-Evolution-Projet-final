import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { headers } from 'next/headers';

// Simple in-memory rate limiter (resets on server restart)
const rateLimitMap = new Map();

export async function POST(request: Request) {
    try {
        // Rate Limiting Logic
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') || 'unknown';
        const limit = 3; // Max emails per hour
        const windowMs = 60 * 60 * 1000; // 1 hour

        if (ip !== 'unknown') {
            const currentRequest = rateLimitMap.get(ip) || { count: 0, startTime: Date.now() };

            if (Date.now() - currentRequest.startTime > windowMs) {
                // Reset window
                currentRequest.count = 1;
                currentRequest.startTime = Date.now();
            } else {
                currentRequest.count += 1;
            }

            rateLimitMap.set(ip, currentRequest);

            if (currentRequest.count > limit) {
                return NextResponse.json(
                    { error: 'Trop de tentatives. Veuillez réessayer plus tard.' },
                    { status: 429 }
                );
            }
        }

        const body = await request.json();
        const { name, firstName, email, phone, guests, eventType, date, location, services, message } = body;

        // Simple Validation
        if (!name || !firstName || !email || !message) {
            return NextResponse.json(
                { error: 'Nom, Prénom, Email et Message sont requis.' },
                { status: 400 }
            );
        }

        const servicesList = Array.isArray(services) ? services.join(', ') : services || 'Aucune sélection';
        const guestsText = guests ? `${guests} personnes` : 'Non précisé';

        const emailContent = `
      Nouveau message de contact (MusicEvolution14)
      
      Client: ${firstName} ${name}
      Email: ${email}
      Téléphone: ${phone}
      
      Événement: ${eventType}
      Nombre d'invités: ${guestsText}
      Date: ${date}
      Lieu: ${location}
      Prestations souhaitées: ${servicesList}
      
      Message:
      ${message}
    `;

        // Explicit Check for Env Vars
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.error('CRITICAL: Missing Email Credentials');
            return NextResponse.json(
                { error: 'Configuration Erreur: Les variables GMAIL_USER ou GMAIL_PASS sont manquantes sur le serveur.' },
                { status: 500 }
            );
        }

        console.log('--- PRÉPARATION ENVOI GMAIL ---');
        console.log('Debug Creds:', {
            hasUser: !!process.env.GMAIL_USER,
            hasPass: !!process.env.GMAIL_PASS,
            userLength: process.env.GMAIL_USER?.length,
            passLength: process.env.GMAIL_PASS?.length
        });

        // Create Transporter
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

        // Verify connection
        await transporter.verify();
        console.log('--- CONNEXION GMAIL VALIDÉE ---');

        // Send Email
        const info = await transporter.sendMail({
            from: `"MusicEvolution14 Site" <${process.env.GMAIL_USER}>`,
            to: 'musicevolution144@gmail.com',
            replyTo: email,
            subject: `Nouveau Contact: ${firstName} ${name} (${eventType})`,
            text: emailContent,
        });

        console.log('--- EMAIL ADMIN ENVOYÉ ---', info.messageId);

        // Auto-response to Client
        await transporter.sendMail({
            from: `"MusicEvolution14" <${process.env.GMAIL_USER}>`,
            to: email, // Send to Client
            subject: 'Confirmation de réception - MusicEvolution14',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="background-color: #111; padding: 40px 20px; text-align: center;">
                        <img src="cid:logo" alt="MusicEvolution14" style="width: 150px; height: auto; display: block; margin: 0 auto;" />
                        <h1 style="color: #D4AF37; margin-top: 20px; font-size: 20px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">MusicEvolution14</h1>
                    </div>
                    <div style="padding: 40px; background-color: #fff;">
                        <h2 style="color: #111; margin-top: 0; font-size: 22px;">Merci de votre confiance, ${firstName}.</h2>
                        <p style="color: #555; line-height: 1.6;">Nous avons bien reçu votre demande pour votre événement <strong>${eventType}</strong> (${guestsText}).</p>
                        <p style="color: #555; line-height: 1.6;">L'équipe MusicEvolution14 analyse actuellement votre projet. Nous reviendrons vers vous sous <strong>24h à 48h</strong> avec une proposition adaptée.</p>
                        
                        <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #D4AF37; margin: 30px 0;">
                            <h3 style="margin-top: 0; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Votre message</h3>
                            <p style="margin-bottom: 0; font-style: italic; color: #333;">"${message}"</p>
                        </div>

                        <div style="text-align: center; margin-top: 40px;">
                            <a href="https://musicevolution14.com" style="background-color: #D4AF37; color: #000; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 14px;">Retourner sur le site</a>
                        </div>
                    </div>
                    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                        <p>© 2024 MusicEvolution14. Créateurs d'émotions.</p>
                        <p>Basse-Normandie, France</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: 'logo.webp',
                    path: process.cwd() + '/public/logo.webp',
                    cid: 'logo' // same cid value as in the html img src
                }
            ]
        });
        console.log('--- AUTO-RÉPONSE ENVOYÉE AU CLIENT ---');

        return NextResponse.json({ success: true, message: 'Email envoyé avec succès !' });

    } catch (error: any) {
        console.error('Erreur Nodemailer:', error);
        return NextResponse.json(
            { error: "Erreur lors de l'envoi du message: " + error.message },
            { status: 500 }
        );
    }
}
