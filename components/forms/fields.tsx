import { cn } from '@/lib/utils';

const inputBase =
  'w-full rounded-2xl border-2 border-petrole/15 bg-creme px-4 py-3 text-base text-petrole placeholder:text-petrole/40 transition-colors focus:border-petrole focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-creme';

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-petrole/85"
    >
      {children}
      {required && (
        <span className="text-terracotta" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-medium text-terracotta" role="alert">
      {message}
    </p>
  );
}

export const TextInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn(inputBase, className)} {...props} />
);

export const TextArea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={cn(inputBase, 'min-h-[140px] resize-y', className)} {...props} />
);

/** Champ honeypot caché (anti-spam) — invisible et hors du flux clavier. */
export function Honeypot() {
  return (
    <div className="absolute left-[-9999px]" aria-hidden="true">
      <label htmlFor="website">Ne pas remplir</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

export function FormStatus({
  state,
  successMsg,
  errorMsg,
}: {
  state: 'idle' | 'loading' | 'success' | 'error';
  successMsg: string;
  errorMsg: string;
}) {
  if (state === 'success') {
    return (
      <p
        className="rounded-2xl border-2 border-sauge/40 bg-sauge/10 px-4 py-3 text-sm font-semibold text-petrole"
        role="status"
      >
        ✓ {successMsg}
      </p>
    );
  }
  if (state === 'error') {
    return (
      <p
        className="rounded-2xl border-2 border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm font-semibold text-terracotta"
        role="alert"
      >
        {errorMsg}
      </p>
    );
  }
  return null;
}
