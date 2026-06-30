import { z } from 'zod';

/** Champ honeypot anti-spam (doit rester vide). */
const honeypot = z.string().max(0).optional().or(z.literal(''));

export const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, 'Merci d’indiquer votre nom.')
    .max(80, 'Nom trop long.'),
  email: z
    .string()
    .trim()
    .email('Adresse e-mail invalide.')
    .max(120),
  sujet: z.string().trim().max(120).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Votre message est un peu court.')
    .max(3000, 'Message trop long.'),
  rgpd: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter la politique de confidentialité.' }),
  }),
  // Honeypot
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
