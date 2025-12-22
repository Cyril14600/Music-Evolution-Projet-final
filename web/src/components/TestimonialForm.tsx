'use client';

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function TestimonialForm() {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);



        // Form data is automatically collected from inputs with 'name' attributes
        // We can just send the formData directly

        try {
            const response = await fetch('/api/temoignages', {
                method: 'POST',
                // Content-Type header is NOT set here so the browser can set the multipart boundary
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Erreur inconnue');

            toast.success('Merci ! Votre témoignage a été envoyé avec succès.');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'envoi.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="testimonial-form-section reveal">
            <h3 className="text-center">📝 Partagez votre expérience</h3>
            <p className="text-center" style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
                Vous avez fait appel à nos services ? Laissez-nous votre avis !
            </p>



            <form id="testimonialForm" onSubmit={handleSubmit}>
                <div className="grid grid-2" style={{ gap: 'var(--space-md)' }}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="firstName">Votre prénom *</label>
                        <input type="text" className="form-input" id="firstName" name="firstName" placeholder="Ex: Marie" required disabled={isLoading} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="lastName">Votre nom *</label>
                        <input type="text" className="form-input" id="lastName" name="lastName" placeholder="Ex: Dupont" required disabled={isLoading} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Votre adresse email *</label>
                        <input type="email" className="form-input" id="email" name="email" placeholder="Ex: marie@exemple.com" required disabled={isLoading} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="date">Date de l'événement *</label>
                        <input type="date" className="form-input" id="date" name="date" required disabled={isLoading} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="eventType">Type d'événement *</label>
                    <select className="form-select" id="eventType" name="eventType" required disabled={isLoading}>
                        <option value="">Sélectionnez...</option>
                        <option value="Mariage">Mariage</option>
                        <option value="Anniversaire">Anniversaire</option>
                        <option value="Soirée privée">Soirée privée</option>
                        <option value="Événement entreprise">Événement entreprise</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Votre note *</label>
                    <div className="rating-input">
                        <input type="radio" id="star5" name="rating" value="5" required />
                        <label htmlFor="star5">★</label>
                        <input type="radio" id="star4" name="rating" value="4" />
                        <label htmlFor="star4">★</label>
                        <input type="radio" id="star3" name="rating" value="3" />
                        <label htmlFor="star3">★</label>
                        <input type="radio" id="star2" name="rating" value="2" />
                        <label htmlFor="star2">★</label>
                        <input type="radio" id="star1" name="rating" value="1" />
                        <label htmlFor="star1">★</label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="photo">Photo (optionnel)</label>
                    <input type="file" className="form-input" id="photo" name="photo" accept="image/*" disabled={isLoading} />
                    <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>
                        Formats acceptés : JPG, PNG, WEBP.
                    </small>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="message">Votre témoignage *</label>
                    <textarea className="form-textarea" id="message" name="message" rows={4} placeholder="Partagez votre expérience avec MusicEvolution14..." required disabled={isLoading}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', opacity: isLoading ? 0.7 : 1 }} disabled={isLoading}>
                    {isLoading ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
                </button>
            </form>
        </div>
    );
}
