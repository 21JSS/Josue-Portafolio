import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { SocialIcon } from '../components/SocialIcon';
import { socialLinks, contactConfig } from '../data/socialLinks';
import { Send, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'pending' | 'success' | 'error';

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = t('contact.form.nameRequired');
    if (!form.email.trim()) errs.email = t('contact.form.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('contact.form.emailInvalid');
    if (!form.message.trim()) errs.message = t('contact.form.messageRequired');
    else if (form.message.trim().length < 10) errs.message = t('contact.form.messageMin');
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('pending');

    // NOTE: No backend/service configured — simulates pending state
    // To connect: replace this with your emailjs/formspree/api call using env variables
    setTimeout(() => {
      setStatus('error');
    }, 1000);
  };

  const inputBase =
    'block w-full min-w-0 rounded-xl bg-[#10202B] border px-5 py-4 text-base leading-relaxed text-[#F2F7FA] placeholder:text-[#718591] outline-none transition-all duration-200 focus:border-[#62E6D2]/50 focus:ring-1 focus:ring-[#62E6D2]/30';

  return (
    <section
      id="contact"
      className="section bg-[#0A0F0A]"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <SectionHeading
          titleKey="contact.title"
          subtitleKey="contact.subtitle"
          centered
        />

        <p className="text-[#A2B4BE] text-center mb-10 max-w-lg mx-auto">
          {t('contact.description')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Pending note */}
            <div className="mb-5 flex items-start gap-2 p-3 rounded-xl bg-amber-500/08 border border-amber-500/20 text-xs text-amber-400">
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              {t('contact.form.pendingNote')}
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6" aria-label="Contact form">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#A2B4BE] mb-2">
                  {t('contact.form.name')} <span aria-hidden="true" className="text-[#62E6D2]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.namePlaceholder')}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  className={`${inputBase} ${errors.name ? 'border-red-500/50' : 'border-[#62E6D2]/12'}`}
                />
                {errors.name && (
                  <p id="error-name" role="alert" className="mt-1 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#A2B4BE] mb-2">
                  {t('contact.form.email')} <span aria-hidden="true" className="text-[#62E6D2]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  className={`${inputBase} ${errors.email ? 'border-red-500/50' : 'border-[#62E6D2]/12'}`}
                />
                {errors.email && (
                  <p id="error-email" role="alert" className="mt-1 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[#A2B4BE] mb-2">
                  {t('contact.form.message')} <span aria-hidden="true" className="text-[#62E6D2]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={`${inputBase} min-h-40 resize-y ${errors.message ? 'border-red-500/50' : 'border-[#62E6D2]/12'}`}
                />
                {errors.message && (
                  <p id="error-message" role="alert" className="mt-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === 'pending'}
                icon={<Send size={14} />}
              >
                {status === 'pending' ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>

              {/* Status messages */}
              {status === 'success' && (
                <div role="status" className="flex items-start gap-2 p-3 rounded-xl bg-[#62E6D2]/08 border border-[#62E6D2]/20 text-xs text-[#62E6D2]">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{t('contact.form.successTitle')}</strong>
                    <p className="mt-0.5">{t('contact.form.successText')}</p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-red-500/08 border border-red-500/20 text-xs text-red-400">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{t('contact.form.errorTitle')}</strong>
                    <p className="mt-0.5">{t('contact.form.errorText')}</p>
                  </div>
                </div>
              )}
            </form>
          </motion.div>

          {/* Direct contact info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-sm font-medium text-[#A2B4BE] mb-4">{t('contact.orContact')}</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <SocialIcon
                    key={link.id}
                    {...link}
                    size="lg"
                    showTooltip
                  />
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#10202B] border border-[#62E6D2]/08">
              <p className="text-xs text-[#718591] mb-1">Email directo</p>
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-sm text-[#62E6D2] hover:underline"
              >
                {contactConfig.email}
              </a>
            </div>

            {/* CV download */}
            <div>
              {contactConfig.cvUrl ? (
                <Button
                  href={contactConfig.cvUrl}
                  variant="secondary"
                  size="md"
                  icon={<Download size={14} />}
                  download
                >
                  {t('contact.downloadCv')}
                </Button>
              ) : (
                <Button variant="ghost" size="md" disabled icon={<Download size={14} />}>
                  {t('contact.cvNotAvailable')}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
