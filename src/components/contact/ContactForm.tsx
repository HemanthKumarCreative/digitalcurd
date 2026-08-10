'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Loader2,
  Mail,
  Sparkles,
} from 'lucide-react'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'

type FormFields = {
  name: string
  email: string
  service: string
  requirements: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const trustPoints = [
  { icon: Clock3, label: 'Reply in 8 business hours' },
  { icon: CheckCircle2, label: 'Free consult — clear next steps' },
]

const successNextSteps = [
  { icon: Mail, label: 'We review your enquiry and context' },
  { icon: Clock3, label: 'A specialist replies within 8 business hours' },
  { icon: Sparkles, label: 'You get clear next steps — no hard sell' },
]

const successMotion = {
  container: {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  },
  item: {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  },
}

type ContactFormData = {
  title: string
  subtitle?: string
  leftCol: {
    email: string
    emailLabel?: string
  }
  form: {
    namePlaceholder: string
    emailPlaceholder: string
    servicePlaceholder: string
    requirementsPlaceholder: string
    submitButton: string
    successMessage: string
    services: { group: string; options: string[] }[]
  }
  imageUrl?: string
}

export default function ContactForm({ data: contactForm }: { data: ContactFormData }) {
  const listboxId = useId()
  const serviceRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    service: '',
    requirements: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [activeOption, setActiveOption] = useState(0)

  const serviceGroups = contactForm.form.services
  const flatServices = serviceGroups.flatMap((group) => group.options)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (isSuccess) setIsSuccess(false)
  }

  const handleSelectService = (service: string) => {
    setFormData((prev) => ({ ...prev, service }))
    setErrors((prev) => ({ ...prev, service: undefined }))
    setIsServiceOpen(false)
    if (isSuccess) setIsSuccess(false)
  }

  const validate = (): boolean => {
    const next: FieldErrors = {}
    if (formData.name.trim().length < 3) next.name = 'Please enter your full name'
    if (!emailRegex.test(formData.email.trim())) next.email = 'Please enter a valid email'
    if (!formData.service) next.service = 'Please select a service'
    if (formData.requirements.trim().length < 10) {
      next.requirements = 'Tell us a bit more about your project (10+ characters)'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmittedEmail(formData.email.trim())
      setIsSuccess(true)
      setFormData({
        name: '',
        email: '',
        service: '',
        requirements: '',
      })
      setErrors({})
    } catch (error) {
      console.error(error)
      alert('There was a problem submitting your inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendAnother = () => {
    setIsSuccess(false)
    setSubmittedEmail('')
  }

  useEffect(() => {
    if (!isServiceOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!serviceRef.current?.contains(event.target as Node)) {
        setIsServiceOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsServiceOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isServiceOpen])

  useEffect(() => {
    if (!formData.service) {
      setActiveOption(0)
      return
    }
    const index = flatServices.indexOf(formData.service)
    if (index >= 0) setActiveOption(index)
  }, [formData.service, flatServices])

  const handleServiceKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isServiceOpen) {
        setIsServiceOpen(true)
        return
      }

      setActiveOption((prev) => {
        if (event.key === 'ArrowDown') return (prev + 1) % flatServices.length
        return (prev - 1 + flatServices.length) % flatServices.length
      })
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!isServiceOpen) {
        setIsServiceOpen(true)
        return
      }
      handleSelectService(flatServices[activeOption])
      return
    }

    if (event.key === 'Escape') {
      setIsServiceOpen(false)
    }
  }

  const imageUrl =
    contactForm.imageUrl ||
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80'

  return (
    <section className="dc-contact" id="form" aria-label="Book a free consultation">
      <div className="dc-contact__bg" aria-hidden="true">
        <EditableImage
          path="contactForm.imageUrl"
          label="Contact → Background"
          value={imageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="dc-contact__overlay dc-design-overlay-pass" />
      </div>

      <div className="dc-contact__container dc-contact__container--slim dc-design-content-layer">
        <div className="dc-contact__intro">
          <p className="dc-contact__eyebrow">Let&apos;s talk</p>
          <EditableText
            as="h2"
            path="contactForm.title"
            label="Contact → Title"
            value={contactForm.title}
            className="dc-contact__title"
          />
          <EditableText
            as="p"
            path="contactForm.subtitle"
            label="Contact → Subtitle"
            value={contactForm.subtitle || ''}
            className="dc-contact__subtitle"
            multiline
          />

          <ul className="dc-contact__trust">
            {trustPoints.map((item) => (
              <li key={item.label}>
                <item.icon size={18} strokeWidth={2} aria-hidden="true" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <a href={`mailto:${contactForm.leftCol.email}`} className="dc-contact__quick-link">
            <Mail size={16} aria-hidden="true" />
            <EditableText
              as="span"
              path="contactForm.leftCol.email"
              label="Contact → Email"
              value={contactForm.leftCol.email}
            />
          </a>
        </div>

        <div className={`dc-contact__card ${isSuccess ? 'is-success' : ''}`}>
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                className="dc-contact__success"
                role="status"
                aria-live="polite"
                variants={successMotion.container}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div className="dc-contact__success-icon" variants={successMotion.item}>
                  <motion.span
                    className="dc-contact__success-ring"
                    aria-hidden="true"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  />
                  <motion.span
                    className="dc-contact__success-check"
                    aria-hidden="true"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.12, type: 'spring', stiffness: 320, damping: 16 }}
                  >
                    <Check size={28} strokeWidth={2.75} />
                  </motion.span>
                </motion.div>

                <motion.p className="dc-contact__success-eyebrow" variants={successMotion.item}>
                  Enquiry received
                </motion.p>
                <motion.h3 className="dc-contact__success-title" variants={successMotion.item}>
                  You&apos;re all set
                </motion.h3>

                {submittedEmail ? (
                  <motion.p className="dc-contact__success-email" variants={successMotion.item}>
                    We&apos;ll reply to <strong>{submittedEmail}</strong>
                  </motion.p>
                ) : null}

                <motion.ul className="dc-contact__success-steps" variants={successMotion.item}>
                  {successNextSteps.map((step) => (
                    <li key={step.label}>
                      <span className="dc-contact__success-step-icon" aria-hidden="true">
                        <step.icon size={16} strokeWidth={2.25} />
                      </span>
                      <span>{step.label}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.div className="dc-contact__success-actions" variants={successMotion.item}>
                  <button
                    type="button"
                    className="dc-contact__secondary-btn"
                    onClick={handleSendAnother}
                  >
                    Send another enquiry
                  </button>
                  <a
                    href={`mailto:${contactForm.leftCol.email}`}
                    className="dc-contact__success-mail"
                  >
                    <Mail size={15} aria-hidden="true" />
                    Email us directly
                  </a>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="dc-contact__form"
                onSubmit={handleSubmit}
                noValidate
              >
              <div className="dc-contact__form-head">
                <h3>Start a conversation</h3>
                <p>Four quick fields — we&apos;ll take it from there.</p>
              </div>

              <div className="dc-contact__grid">
                <label className={`dc-field ${errors.name ? 'has-error' : ''}`}>
                  <span>Full name *</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Cooper"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <em>{errors.name}</em>}
                </label>

                <label className={`dc-field ${errors.email ? 'has-error' : ''}`}>
                  <span>Work email *</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <em>{errors.email}</em>}
                </label>

                <div
                  ref={serviceRef}
                  className={`dc-field dc-field--full dc-select ${errors.service ? 'has-error' : ''} ${isServiceOpen ? 'is-open' : ''}`}
                >
                  <span id={`${listboxId}-label`}>Service *</span>
                  <button
                    type="button"
                    className={`dc-select__trigger ${formData.service ? 'has-value' : ''}`}
                    aria-haspopup="listbox"
                    aria-expanded={isServiceOpen}
                    aria-labelledby={`${listboxId}-label`}
                    aria-controls={listboxId}
                    aria-invalid={Boolean(errors.service)}
                    onClick={() => setIsServiceOpen((prev) => !prev)}
                    onKeyDown={handleServiceKeyDown}
                  >
                    <span>
                      {formData.service || 'Select a service'}
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2.25}
                      className={`dc-select__chevron ${isServiceOpen ? 'is-open' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isServiceOpen && (
                    <div className="dc-select__menu" role="listbox" id={listboxId} tabIndex={-1}>
                      {serviceGroups.map((group) => (
                        <div key={group.group} className="dc-select__group">
                          <p className="dc-select__group-label">{group.group}</p>
                          {group.options.map((option) => {
                            const currentIndex = flatServices.indexOf(option)
                            const isSelected = formData.service === option
                            const isActive = activeOption === currentIndex
                            return (
                              <button
                                key={option}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                className={`dc-select__option ${isSelected ? 'is-selected' : ''} ${isActive ? 'is-active' : ''}`}
                                onMouseEnter={() => setActiveOption(currentIndex)}
                                onClick={() => handleSelectService(option)}
                              >
                                <span>{option}</span>
                                {isSelected && <Check size={16} strokeWidth={2.5} aria-hidden="true" />}
                              </button>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.service && <em>{errors.service}</em>}
                </div>

                <label className={`dc-field dc-field--full ${errors.requirements ? 'has-error' : ''}`}>
                  <span>How can we help? *</span>
                  <textarea
                    name="requirements"
                    rows={3}
                    placeholder="Goals, timeline, or challenges..."
                    value={formData.requirements}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.requirements)}
                  />
                  {errors.requirements && <em>{errors.requirements}</em>}
                </label>
              </div>

              <button
                type="submit"
                className="dc-contact__submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="dc-contact__submit-spinner"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <EditableText
                      as="span"
                      path="contactForm.form.submitButton"
                      label="Contact → Submit"
                      value={contactForm.form.submitButton}
                    />
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="dc-contact__fineprint">
                No spam. We only reply about this enquiry.
              </p>
            </motion.form>
          )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
