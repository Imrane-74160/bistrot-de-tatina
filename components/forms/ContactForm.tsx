'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { contactSchema } from '@/lib/validation';
import { Label, FieldError, TextInput, TextArea, Honeypot, FormStatus } from './fields';
import { cn } from '@/lib/utils';

type Errors = Partial<Record<string, string>>;

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, rgpd: data.rgpd === 'on' };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (v?.[0]) fieldErrors[k] = v[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('bad status');
      setState('success');
      form.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Honeypot />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nom" required>
          Votre nom
        </Label>
        <TextInput
          id="nom"
          name="nom"
          autoComplete="name"
          required
          aria-invalid={!!errors.nom}
          aria-describedby={errors.nom ? 'err-nom' : undefined}
        />
        <FieldError id="err-nom" message={errors.nom} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" required>
          Votre e-mail
        </Label>
        <TextInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'err-email' : undefined}
        />
        <FieldError id="err-email" message={errors.email} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sujet">Sujet</Label>
        <TextInput id="sujet" name="sujet" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message" required>
          Votre message
        </Label>
        <TextArea
          id="message"
          name="message"
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'err-message' : undefined}
        />
        <FieldError id="err-message" message={errors.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm text-petrole/85">
          <input
            type="checkbox"
            name="rgpd"
            required
            className="mt-1 size-5 shrink-0 rounded border-2 border-petrole/30 text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            aria-invalid={!!errors.rgpd}
            aria-describedby={errors.rgpd ? 'err-rgpd' : undefined}
          />
          <span>
            J'accepte que mes informations soient utilisées pour répondre à ma
            demande, conformément à la{' '}
            <a href="/mentions-legales#rgpd" className="font-semibold text-terracotta underline">
              politique de confidentialité
            </a>
            . <span className="text-terracotta">*</span>
          </span>
        </label>
        <FieldError id="err-rgpd" message={errors.rgpd} />
      </div>

      <FormStatus
        state={state}
        successMsg="Message envoyé, merci ! Nous vous répondrons vite."
        errorMsg="L'envoi a échoué. Réessayez ou appelez-nous au 07 89 06 06 44."
      />

      <button
        type="submit"
        disabled={state === 'loading'}
        className={cn(
          'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill bg-petrole px-8 font-mono text-sm font-bold uppercase tracking-[0.12em] text-jaune transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:opacity-60',
        )}
      >
        <Send className="size-4" aria-hidden="true" />
        {state === 'loading' ? 'Envoi…' : 'Envoyer le message'}
      </button>
    </form>
  );
}
