// lib/newsletter-copy.ts
//
// All wording for the signup form, in English and Canadian French.
// If you change CONSENT wording, also bump NEWSLETTER_CONSENT_VERSION.
//
// The EPM site is English-only today (one `lang="en"` root layout, no /fr
// routes). The French copy is kept here so a French page can render
// <NewsletterSignup lang="fr" /> the day one exists.

// Role values are sent to Mailchimp as-is. They must match the choices in
// the "Role" dropdown field in Mailchimp exactly (spelling and capitals).
export const ROLE_VALUES = [
  "Researcher / academic",
  "Government / policymaker",
  "Industry / utility",
  "Non-profit / advocacy",
  "Media",
  "Student",
  "Other",
];

const SENDER = {
  name: "Open Insights",
  address: "c/o SESIT, Institute for Integrated Energy Systems, University of Victoria, PO Box 1700 STN CSC, Victoria BC V8W 2Y2, Canada",
  contact: "deven@openinsights.ca",
};

export const COPY = {
  en: {
    heading: "Stay informed",
    intro: "Research and updates from Open Insights, including new Energy Policy Monitor assessments.",
    emailLabel: "Email address",
    emailPlaceholder: "Your email",
    subscribe: "Subscribe",
    dialogTitle: "Subscribe to the Open Insights newsletter",
    dialogIntro: "A few details help us send you what's relevant.",
    firstName: "First name",
    lastName: "Last name",
    organization: "Organization",
    role: "I am a…",
    roleSelect: "Select",
    roles: [
      "Researcher / academic",
      "Government / policymaker",
      "Industry / utility",
      "Non-profit / advocacy",
      "Media",
      "Student",
      "Other",
    ],
    optional: "optional",
    consent: `I agree to receive the ${SENDER.name} newsletter: research, new Energy Policy Monitor assessments and updates, a few times a year. I can unsubscribe at any time using the link in every email.`,
    sender: `${SENDER.name}, ${SENDER.address} · ${SENDER.contact}`,
    submit: "Subscribe",
    submitting: "Sending…",
    cancel: "Cancel",
    close: "Close",
    successTitle: "Check your inbox",
    successBody: "We've sent you an email. Click the link in it to confirm your subscription.",
    alreadyBody: "You're already subscribed. Thanks for reading.",
    errors: {
      invalid_email: "Please enter a valid email address.",
      consent_required: "Please tick the box to confirm you want to receive the newsletter.",
      forgotten_email: "This address was permanently removed from our list. Please contact us to resubscribe.",
      rate_limited: "Too many attempts. Please try again in a few minutes.",
      generic: "Something went wrong. Please try again later.",
    },
  },
  fr: {
    heading: "Restez informé·e",
    intro: "Recherches et mises à jour d'Open Insights, y compris les nouvelles évaluations de l'Energy Policy Monitor.",
    emailLabel: "Adresse courriel",
    emailPlaceholder: "Votre courriel",
    subscribe: "S'abonner",
    dialogTitle: "Abonnez-vous à l'infolettre d'Open Insights",
    dialogIntro: "Quelques précisions nous aident à vous envoyer du contenu pertinent.",
    firstName: "Prénom",
    lastName: "Nom",
    organization: "Organisation",
    role: "Je suis…",
    roleSelect: "Sélectionner",
    roles: [
      "Chercheur·e / milieu universitaire",
      "Gouvernement / décideur·e",
      "Industrie / services publics",
      "Organisme sans but lucratif",
      "Médias",
      "Étudiant·e",
      "Autre",
    ],
    optional: "facultatif",
    consent: `J'accepte de recevoir l'infolettre d'${SENDER.name} : recherches, nouvelles évaluations de l'Energy Policy Monitor et mises à jour, quelques fois par année. Je peux me désabonner en tout temps grâce au lien inclus dans chaque courriel.`,
    sender: `${SENDER.name}, ${SENDER.address} · ${SENDER.contact}`,
    submit: "S'abonner",
    submitting: "Envoi…",
    cancel: "Annuler",
    close: "Fermer",
    successTitle: "Vérifiez votre boîte de réception",
    successBody: "Nous vous avons envoyé un courriel. Cliquez sur le lien pour confirmer votre abonnement.",
    alreadyBody: "Vous êtes déjà abonné·e. Merci de nous lire.",
    errors: {
      invalid_email: "Veuillez entrer une adresse courriel valide.",
      consent_required: "Veuillez cocher la case pour confirmer que vous souhaitez recevoir l'infolettre.",
      forgotten_email: "Cette adresse a été retirée définitivement de notre liste. Communiquez avec nous pour vous réabonner.",
      rate_limited: "Trop de tentatives. Veuillez réessayer dans quelques minutes.",
      generic: "Une erreur s'est produite. Veuillez réessayer plus tard.",
    },
  },
} as const;

export type Lang = keyof typeof COPY;
