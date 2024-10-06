/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CorpInsights Collective</h1>
      <p className="text-xl italic mb-8">Making impressions before they were even a metric.</p>
      <Link href="/services" className="btn-primary">
        Explore Our Services
      </Link>
      
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Authentic Communication</h3>
            <p>We cut to the chase with straight talk and real results.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Tech-Driven Strategies</h3>
            <p>Leveraging AI and emerging technologies for scalable growth.</p>
          </div>
         
          <div>
            <h3 className="text-xl font-semibold mb-2">Collective Success</h3>
            <p>Our success is tied to your growth. We&apos;re in this together.</p>
          </div>
        </div>
      </section>
    </div>
  )
}