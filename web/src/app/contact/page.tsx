'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import faqData from '../../data/faq.json';
import stepsData from '../../data/steps.json';
import contactData from '../../data/contact.json';
import { useToast } from '@/context/ToastContext';
import { fetchAPI, getStrapiURL } from '@/lib/api';
import AvailabilityBlock from '@/components/AvailabilityBlock';

// Interfaces for Strapi Data
interface ContactPageData {
    title?: string;
    introText?: string;
    formTitle?: string;
    infoTitle?: string;
    reassuranceTitle?: string;
    reassuranceText?: string;
    faqTitle?: string;
    stepsTitle?: string;
}

interface GlobalData {
    siteName?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactAddress?: string;
    facebookUrl?: string;
    instagramUrl?: string;
}

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

interface StepItem {
    id: number;
    stepNumber: string;
    title: string;
    description: string;
    icon: string;
}

// Function to fetch all data safely
async function getPageData() {
    try {
        const [contactPageRes, globalRes, faqsRes, stepsRes] = await Promise.all([
            fetchAPI('/contact-page', { populate: '*' }, { cache: 'no-store' }),
            fetchAPI('/global', { populate: '*' }, { cache: 'no-store' }),
            fetchAPI('/faqs', { sort: 'id:asc' }, { cache: 'no-store' }),
            fetchAPI('/steps', { sort: 'stepNumber:asc' }, { cache: 'no-store' })
        ]);

        return {
            contactPage: contactPageRes?.data?.attributes as ContactPageData | null,
            global: globalRes?.data?.attributes as GlobalData | null,
            faqs: faqsRes?.data as Array<{ id: number; attributes: Omit<FaqItem, 'id'> }> | null,
            steps: stepsRes?.data as Array<{ id: number; attributes: Omit<StepItem, 'id'> }> | null,
        };
    } catch (err) {
        console.error("Error fetching contact page data:", err);
        return { contactPage: null, global: null, faqs: null, steps: null };
    }
}

export default function ContactPage() {
    const toast = useToast();

    // State for data
    const [fetchedData, setFetchedData] = useState<{
        contactPage: ContactPageData | null;
        global: GlobalData | null;
        faqs: FaqItem[] | null;
        steps: StepItem[] | null;
    }>({ contactPage: null, global: null, faqs: null, steps: null });

    const [isLoadingData, setIsLoadingData] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        async function load() {
            const data = await getPageData();
            setFetchedData({
                contactPage: data.contactPage,
                global: data.global,
                faqs: data.faqs?.map(f => ({ id: f.id, ...f.attributes })) || null,
                steps: data.steps?.map(s => ({ id: s.id, ...s.attributes })) || null
            });
            setIsLoadingData(false);
        }
        load();
    }, []);

    // Form fetch state
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
                setStatus('idle');
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

    // Prepare Display Data (Merge Strapi with Fallback)
    const { contactPage, global, faqs, steps } = fetchedData;

    // Contact Info Fallback/Merge
    const displayContact = {
        address: global?.contactAddress ? { ...contactData.address, lines: global.contactAddress.split('\n') } : contactData.address,
        phone: global?.contactPhone ? { ...contactData.phone, number: global.contactPhone, link: `tel:${global.contactPhone.replace(/\s/g, '')}` } : contactData.phone,
        email: global?.contactEmail ? { ...contactData.email, address: global.contactEmail, link: `mailto:${global.contactEmail}` } : contactData.email,
        hours: contactData.hours, // Hours not yet in Strapi Global, generic fallback
        socials: global ? [
            global.facebookUrl ? { ...contactData.socials[0], url: global.facebookUrl } : contactData.socials[0],
            global.instagramUrl ? { ...contactData.socials[1], url: global.instagramUrl } : contactData.socials[1]
        ] : contactData.socials
    };

    // FAQ Fallback
    const displayFaq = (faqs && faqs.length > 0) ? faqs.map(f => ({ q: f.question, a: f.answer })) : faqData;

    // Steps Fallback
    const displaySteps = (steps && steps.length > 0) ? steps.map(s => ({
        step: s.stepNumber,
        icon: s.icon,
        title: s.title,
        desc: s.description
    })) : stepsData;

    const pageTitle = contactPage?.title || "Contactez-nous";
    const pageIntro = contactPage?.introText || "Une question ? Un projet ? Nous sommes là pour vous accompagner.";

    // Splitting title for gradient effect if it exists and has space
    const renderTitle = (title: string) => {
        if (!title.includes(' ')) return <span className="text-gradient">{title}</span>;
        const lastSpace = title.lastIndexOf(' ');
        return (
            <>
                {title.substring(0, lastSpace)} <span className="text-gradient">{title.substring(lastSpace + 1)}</span>
            </>
        );
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
                    <h1>{renderTitle(pageTitle)}</h1>
                    <p>{pageIntro}</p>
                </div>
            </header>

            {/* Contact Section */}
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="reveal-left">
                            <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.75rem' }}>
                                {renderTitle(contactPage?.formTitle || "Demandez votre devis gratuit")}
                            </h2>

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
                            <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.75rem' }}>
                                {renderTitle(contactPage?.infoTitle || "Nos coordonnées")}
                            </h2>

                            <div className="contact-info">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{displayContact.address.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{displayContact.address.title}</h4>
                                        <p>
                                            {Array.isArray(displayContact.address.lines) ? displayContact.address.lines.map((line, i) => (
                                                <span key={i}>{line}<br /></span>
                                            )) : displayContact.address.lines}
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{displayContact.phone.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{displayContact.phone.title}</h4>
                                        <a href={displayContact.phone.link}>{displayContact.phone.number}</a>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{displayContact.email.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{displayContact.email.title}</h4>
                                        <p><a href={displayContact.email.link}>{displayContact.email.address}</a></p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">{displayContact.hours.icon}</div>
                                    <div className="contact-info-content">
                                        <h4>{displayContact.hours.title}</h4>
                                        <p>
                                            {displayContact.hours.lines.map((line, i) => (
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
                                    {displayContact.socials.map((social, index) => (
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
                            <div className="card" style={{ marginTop: 'var(--space-sm)', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.02))' }}>
                                <h4 style={{ marginBottom: 'var(--space-sm)' }}>
                                    {contactPage?.reassuranceTitle || "💬 Réponse rapide garantie"}
                                </h4>
                                <p className="card-text">
                                    {contactPage?.reassuranceText || "Nous répondons à toutes les demandes sous 24 à 48h. Devis personnalisé et accompagnement humain pour votre projet."}
                                </p>
                            </div>

                            {/* New Availability Block */}
                            <AvailabilityBlock />
                        </div>
                    </div>
                </div>
            </section >

            {/* Roadmap Section */}
            < section className="section" style={{ background: 'var(--surface)' }
            }>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Organisation</span>
                        <h2>{renderTitle(contactPage?.stepsTitle || "Votre événement en 4 étapes")}</h2>
                    </div>

                    <div className="grid grid-4">
                        {displaySteps.map((item, index) => (
                            <div key={index} className={`roadmap-step reveal stagger-${index + 1}`}>
                                <div className="step-number">{item.step}</div>
                                <div className="step-icon">{item.icon}</div>
                                <h3 className="step-title">{item.title}</h3>
                                <p className="step-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Map Section */}
            < section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="zone-map reveal">
                        <iframe title="Carte de localisation" src="https://maps.google.com/maps?q=loc:49.1052,-0.7736&z=15&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </section >

            {/* FAQ Section */}
            < section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container container-sm">
                    <div className="section-header reveal">
                        <span className="subtitle">FAQ</span>
                        <h2>{renderTitle(contactPage?.faqTitle || "Questions fréquentes")}</h2>
                    </div>

                    <div className="faq-container reveal">
                        {displayFaq.map((item, index) => (
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
            </section >
        </>
    );
}
