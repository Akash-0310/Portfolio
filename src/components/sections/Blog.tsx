'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { blogPosts } from '@/lib/data'

export function Blog() {
  return (
    <section id="blog" className="relative section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Writing"
          title="Engineering"
          titleHighlight="insights"
          description="Thoughts on architecture, performance, and building software that scales."
          align="center"
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              className="group relative rounded-2xl glass overflow-hidden flex flex-col cursor-pointer hover:border-white/15 transition-all duration-300"
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-36 bg-gradient-to-br ${post.gradient} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 grid-bg opacity-20" />
                <BookOpen className="w-10 h-10 text-white/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent" />
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{post.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug group-hover:text-violet-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/6">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs text-white/25 font-mono">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-violet-400/50 group-hover:text-violet-400 transition-colors font-medium">
                    Read
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <p className="text-sm text-white/30">More articles coming soon — follow me on LinkedIn for updates.</p>
        </motion.div>
      </div>
    </section>
  )
}
