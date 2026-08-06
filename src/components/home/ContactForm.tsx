'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Check, CheckCircle2, ChevronDown, Clock3, Mail } from 'lucide-react'

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
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({
      name: '',
      email: '',
      service: '',
      requirements: '',
    })
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
        <img src={imageUrl} alt="" />
        <div className="dc-contact__overlay" />
      </div>

      <div className="dc-contact__container dc-contact__container--slim">
        <div className="dc-contact__intro">
          <p className="dc-contact__eyebrow">Let&apos;s talk</p>
          <h2 className="dc-contact__title">{contactForm.title}</h2>
          <p className="dc-contact__subtitle">{contactForm.subtitle}</p>

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
            {contactForm.leftCol.email}
          </a>
        </div>

        <div className="dc-contact__card">
          {isSuccess ? (
            <div className="dc-contact__success" role="status">
              <CheckCircle2 size={40} strokeWidth={1.75} aria-hidden="true" />
              <h3>You&apos;re all set</h3>
              <p>{contactForm.form.successMessage}</p>
              <button
                type="button"
                className="dc-contact__secondary-btn"
                onClick={() => setIsSuccess(false)}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="dc-contact__form" onSubmit={handleSubmit} noValidate>
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
              >
                {isSubmitting ? 'Sending…' : contactForm.form.submitButton}
                {!isSubmitting && <ArrowRight size={18} aria-hidden="true" />}
              </button>

              <p className="dc-contact__fineprint">
                No spam. We only reply about this enquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
