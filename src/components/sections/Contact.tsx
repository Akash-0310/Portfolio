'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, Phone, Zap, MessageSquare } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/LinkedinIcon'
import { GithubIcon } from '@/components/ui/GithubIcon'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { siteConfig } from '@/lib/data'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [formState, setFormState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    await new Promise((r) => setTimeout(r, 1500))
    setFormState('success')
  }

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06), transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Contact"
          title="Let's build"
          titleHighlight="something"
          description="Open for full-time roles, freelance projects, and interesting collaborations."
          align="center"
        />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: '#8b5cf6' },
              { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `https://wa.me/${siteConfig.phone.replace(/\D/g, '')}`, external: true, color: '#06b6d4' },
              { icon: MapPin, label: 'Location', value: siteConfig.location, href: '#', color: '#10b981' },
            ].map(({ icon: Icon, label, value, href, color, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-5 rounded-2xl glass hover:border-white/15 transition-all duration-200 group"
                variants={fadeInUp}
                whileHover={{ x: 4 }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <div className="text-xs text-white/35 uppercase tracking-wider mb-0.5">{label}</div>
                  <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors break-all">{value}</div>
                </div>
              </motion.a>
            ))}

            <motion.div className="p-5 rounded-2xl glass flex flex-col gap-3" variants={fadeInUp}>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white">{siteConfig.availabilityNote}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs text-white/40">Typically responds within 24 hours</span>
              </div>
            </motion.div>

            <motion.div className="flex gap-3" variants={fadeInUp}>
              {[
                { href: siteConfig.github, Icon: GithubIcon, label: 'GitHub' },
                { href: siteConfig.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
                { href: siteConfig.instagram, Icon: InstagramIcon, label: 'Instagram' },
                { href: `mailto:${siteConfig.email}`, Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass text-white/50 hover:text-white/80 transition-all text-xs font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {formState === 'success' ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center gap-6 p-10 rounded-3xl glass text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                  <p className="text-sm text-white/50">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </div>
                <button onClick={() => { setFormState('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-semibold text-white">Send a message</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
                  ].map(({ id, label, type, placeholder, required }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <label htmlFor={id} className="text-xs text-white/40 font-medium uppercase tracking-wider">{label}</label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/6 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs text-white/40 font-medium uppercase tracking-wider">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can I help?"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/6 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-white/40 font-medium uppercase tracking-wider">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/6 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:bg-violet-500 transition-all duration-200 disabled:opacity-60"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {formState === 'submitting' ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
