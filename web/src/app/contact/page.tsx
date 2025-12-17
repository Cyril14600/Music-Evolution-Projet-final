'use client';

import { useState } from 'react';
import Link from 'next/link';
import faqData from '../../data/faq.json';
import stepsData from '../../data/steps.json';
import contactData from '../../data/contact.json';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        email: '',
        phone: '',
        guests: '',
        eventType: 'Mariage',
        date: '',
        location: '',
        services: [] as string[],
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const currentServices = prev.services || [];
            if (checked) {
                return { ...prev, services: [...currentServices, value] };
            } else {
                return { ...prev, services: currentServices.filter(s => s !== value) };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('idle'); // Reset status to allow re-submission if needed, or keep 'success' but use toast
                toast.success("Message envoyé ! Nous vous répondrons sous 24-48h.");
                setFormData({
                    name: '', firstName: '', email: '', phone: '', guests: '', eventType: 'Mariage', date: '', location: '', services: [], message: ''
                });
            } else {
                setStatus('idle');
                toast.error(data.error || 'Une erreur est survenue.');
                setErrorMessage(data.error || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            toast.error("Erreur de connexion au serveur.");
            setErrorMessage("Erreur de connexion au serveur.");
        }
    };

    // Toggle for FAQ
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <>
            {/* Page Header */}
            <header className="page-header" id="contact-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>/</span>
                        <span>Contact</span>
                    </div>
                    <h1>Contactez-<span className="text-gradient">nous</span></h1>
                    <p>Une question ? Un projet ? Nous sommes là pour vous accompagner.</p>
                </div>
            </header>

            {/* Contact Section */}
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="reveal-left">
                            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Demandez votre <span className="text-gradient">devis gratuit</span></h3>

                            {status === 'success' ? (
                                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                    <h3 className="text-gradient" style={{ marginBottom: '1rem' }}>Message Envoyé !</h3>
                                    <p>Merci de nous avoir contactés. Nous avons bien reçu votre demande et reviendrons vers vous sous 24 à 48 heures.</p>
                                    <button onClick={() => setStatus('idle')} className="btn btn-primary" style={{ marginTop: '2rem' }}>Envoyer un autre message</button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="grid grid-2" style={{ gap: 'var(--space-md)' }}>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="firstName">Prénom *</label>
                                            <input type="text" className="form-input" id="firstName" name="firstName" placeholder="Votre prénom" required value={formData.firstName} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">Nom *</label>
                                            <input type="text" className="form-input" id="name" name="name" placeholder="Votre nom" required value={formData.name} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="grid grid-2" style={{ gap: 'var(--space-md)' }}>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email">Email *</label>
                                            <input type="email" className="form-input" id="email" name="email" placeholder="votre@email.com" required value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="phone">Téléphone *</label>
                                            <input type="tel" className="form-input" id="phone" name="phone" placeholder="06 00 00 00 00" required value={formData.phone} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="grid grid-2" style={{ gap: 'var(--space-md)' }}>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="eventType">Type d'événement *</label>
                                            <select className="form-select" id="eventType" name="eventType" required value={formData.eventType} onChange={handleChange}>
                                                <option value="">Sélectionnez...</option>
                                                <option value="Mariage">Mariage</option>
                                                <option value="Anniversaire">Anniversaire</option>
                                                <option value="Soirée privée">Soirée privée</option>
                                                <option value="Entreprise">Événement d'entreprise</option>
                                                <option value="Autre">Autre</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="guests">Nombre d'invités (estimé)</label>
                                            <input type="number" className="form-input" id="guests" name="guests" placeholder="Ex: 80" value={formData.guests} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="grid grid-2" style={{ gap: 'var(--space-md)' }}>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="date">Date de l'événement (estimée)</label>
                                            <input type="date" className="form-input" id="date" name="date" value={formData.date} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="location">Lieu de l'événement</label>
                                            <input type="text" className="form-input" id="location" name="location" placeholder="Ville ou salle" value={formData.location} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Prestations souhaitées</label>
                                        <div className="checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', marginTop: 'var(--space-xs)' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                <input type="checkbox" name="services" value="Animation DJ" style={{ accentColor: 'var(--primary-accent)' }} checked={formData.services.includes('Animation DJ')} onChange={handleCheckboxChange} /> Animation DJ
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                <input type="checkbox" name="services" value="Déco intérieure" style={{ accentColor: 'var(--primary-accent)' }} checked={formData.services.includes('Déco intérieure')} onChange={handleCheckboxChange} /> Déco intérieure
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                <input type="checkbox" name="services" value="Déco extérieure" style={{ accentColor: 'var(--primary-accent)' }} checked={formData.services.includes('Déco extérieure')} onChange={handleCheckboxChange} /> Déco extérieure
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                                <input type="checkbox" name="services" value="Location matériel" style={{ accentColor: 'var(--primary-accent)' }} checked={formData.services.includes('Location matériel')} onChange={handleCheckboxChange} /> Location matériel
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="message">Votre message *</label>
                                        <textarea className="form-textarea" id="message" name="message" rows={5} placeholder="Décrivez votre projet, vos envies, le nombre d'invités..." required value={formData.message} onChange={handleChange}></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status === 'loading'}>
                                        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                                    </button>

                                    {status === 'error' && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{errorMessage}</p>}

                                    <p style={{ textAlign: 'center', marginTop: 'var(--space-md)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        🔒 Vos informations restent confidentielles et ne seront jamais partagées.
                                    </p>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="reveal-right">
                            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Nos <span className="text-gradient">coordonnées</span></h3>

                            <div className="contact-info">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{contactData.address.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{contactData.address.title}</h4>
                                        <p>
                                            {contactData.address.lines.map((line, i) => (
                                                <span key={i}>{line}<br /></span>
                                            ))}
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{contactData.phone.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{contactData.phone.title}</h4>
                                        <a href={contactData.phone.link}>{contactData.phone.number}</a>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{contactData.email.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{contactData.email.title}</h4>
                                        <p><a href={contactData.email.link}>{contactData.email.address}</a></p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{contactData.hours.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{contactData.hours.title}</h4>
                                        <p>
                                            {contactData.hours.lines.map((line, i) => (
                                                <span key={i}>{line}<br /></span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div style={{ marginTop: 'var(--space-xl)' }}>
                                <h4 style={{ marginBottom: 'var(--space-md)' }}>Suivez-nous</h4>
                                <div className="social-links">
                                    {contactData.socials.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            className="social-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                        >
                                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                {social.iconPath ? (
                                                    <path d={social.iconPath} />
                                                ) : (
                                                    <>
                                                        {social.iconRect && <rect {...social.iconRect} fill="none" stroke="currentColor" strokeWidth="2" />}
                                                        {social.iconGroup?.map((g, i) => (
                                                            g.d ? <path key={i} d={g.d} fill="none" stroke="currentColor" strokeWidth="2" /> :
                                                                g.line ? <line key={i} {...g.line} stroke="currentColor" strokeWidth="2" /> : null
                                                        ))}
                                                    </>
                                                )}
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Reassurance */}
                            <div className="card" style={{ marginTop: 'var(--space-xl)', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.02))' }}>
                                <h4 style={{ marginBottom: 'var(--space-sm)' }}>💬 Réponse rapide garantie</h4>
                                <p className="card-text">
                                    Nous répondons à toutes les demandes sous 24 à 48h.
                                    Devis personnalisé et accompagnement humain pour votre projet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Organisation</span>
                        <h2>Votre événement en <span className="text-gradient">4 étapes</span></h2>
                    </div>

                    <div className="grid grid-4">
                        {stepsData.map((item, index) => (
                            <div key={index} className={`roadmap-step reveal stagger-${index + 1}`}>
                                <div className="step-number">{item.step}</div>
                                <div className="step-icon">{item.icon}</div>
                                <h3 className="step-title">{item.title}</h3>
                                <p className="step-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="zone-map reveal">
                        <iframe src="https://maps.google.com/maps?q=loc:49.1052,-0.7736&z=15&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container container-sm">
                    <div className="section-header reveal">
                        <span className="subtitle">FAQ</span>
                        <h2>Questions <span className="text-gradient">fréquentes</span></h2>
                    </div>

                    <div className="faq-container reveal">
                        {faqData.map((item, index) => (
                            <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
                                <button className="faq-question" onClick={() => toggleFaq(index)}>
                                    {item.q}
                                    <span className="faq-toggle"></span>
                                </button>
                                <div className="faq-answer" style={{ maxHeight: openFaq === index ? '200px' : '0' }}>
                                    <div className="faq-answer-content">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
