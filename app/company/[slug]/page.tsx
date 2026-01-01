'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pageService, Page } from '@/app/api/services/pageService';

export default function CompanyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const data = await pageService.getPageBySlug(slug);
        setPage(data);
      } catch (err) {
        console.error('Failed to fetch page:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-serif mb-4 text-foreground">Page Not Found</h1>
            <p className="text-muted-foreground">The page you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Special handling for 'about-us' to include Team Section and custom styling
  if (slug === 'about-us') {
    const team = [
      { name: "Ankit Raj", url: "https://www.linkedin.com/in/ankitraj1998/", image: "/team/ankit.jpg" },
      { name: "Amit Kumar Das", url: "https://www.linkedin.com/in/amit-kumar-das-a0b81b177/", image: "/team/amit.jpg" },
      { name: "Harsh Kumar", url: "https://www.linkedin.com/in/n0c0dr/", image: "/team/harsh.jpg" },
      { name: "Chirag Jain", url: "https://www.linkedin.com/in/chirag-jain-372468190/", image: "/team/chirag.jpg" }
    ];

    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black font-serif mb-8 tracking-tight">
              About QuickCut
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-serif">
              Redefining how the world visualizes news. We cure the noise to bring you stories that matter, with clarity, depth, and speed.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-serif">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Welcome to QuickCut. In an era of informational overload, we stand as your filter for truth and relevance.
                We are dedicated to delivering not just the fastest, but the most reliable news from around the globe.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform allows you to cut through the clutter and get straight to the heart of the story.
                Global perspective, local nuance, and the speed you demand.
              </p>
            </div>
            <div className="bg-muted p-8 rounded-3xl border border-border">
              <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-8xl font-serif text-foreground/20 font-black">QC</span>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-4xl font-bold font-serif text-center mb-16">Meet The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="group flex flex-col items-center p-8 bg-card rounded-2xl border border-border hover:border-accent hover:shadow-xl transition-all duration-300">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 mb-6 overflow-hidden flex items-center justify-center relative">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-muted-foreground">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-serif mb-2 text-center whitespace-nowrap">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider font-bold">Core Team</p>

                  <a
                    href={member.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full bg-[#0077b5] text-white text-sm font-bold hover:bg-[#006396] transition-colors flex items-center space-x-2"
                  >
                    <span>LinkedIn</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Special handling for 'careers'
  if (slug === 'careers') {
    const jobs = [

      {
        title: "Video Editor",
        department: "Editorial",
        location: "Remote",
        type: "Full-time",
        posted: "1 day ago",
        description: "Create compelling visual stories and edit video content for our mobile-first audience."
      }
    ];

    const filteredJobs = selectedDept
      ? jobs.filter(job => job.department === selectedDept)
      : jobs;

    const scrollToOpenings = () => {
      const element = document.getElementById('openings');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
              Join Our Team
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-serif mb-8 tracking-tight">
              Shape the Future of News
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-serif">
              We&apos;re looking for passionate storytellers, innovators, and dreamers to build the next generation of digital journalism.
            </p>
          </div>

          {/* Departments Grid */}
          <div className="mb-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold font-serif text-center">Our Departments</h2>
              {selectedDept && (
                <button
                  onClick={() => setSelectedDept(null)}
                  className="text-sm text-muted-foreground hover:text-accent underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Editorial", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", bg: "bg-orange-500/10", text: "text-orange-600" },
                { title: "Technology", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", bg: "bg-blue-500/10", text: "text-blue-600" },
                { title: "Product", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", bg: "bg-purple-500/10", text: "text-purple-600" },
                { title: "Sales & Marketing", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", bg: "bg-green-500/10", text: "text-green-600" }
              ].map((dept) => (
                <div
                  key={dept.title}
                  onClick={() => {
                    setSelectedDept(dept.title);
                    scrollToOpenings();
                  }}
                  className={`p-8 rounded-2xl bg-card border ${selectedDept === dept.title ? 'border-accent ring-2 ring-accent/20' : 'border-border'} hover:border-accent/50 hover:shadow-lg transition-all group cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-xl ${dept.bg} ${dept.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dept.icon} /></svg>
                  </div>
                  <h3 className="text-lg font-bold font-serif mb-2">{dept.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDept === dept.title ? 'Viewing positions' : 'Explore opportunities'} &rarr;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div id="openings">
            <h2 className="text-3xl font-bold font-serif mb-12 text-center">
              {selectedDept ? `Open Positions in ${selectedDept}` : 'Open Positions'}
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.title} className="group relative overflow-hidden bg-card rounded-2xl border border-border p-8 hover:border-indigo-500/50 transition-all hover:shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-wider">{job.department}</span>
                          <span className="text-xs text-muted-foreground">• {job.type}</span>
                        </div>
                        <h3 className="text-2xl font-bold font-serif mb-2">{job.title}</h3>
                        <p className="text-muted-foreground mb-4">{job.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Posted {job.posted}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href={`mailto:hussler340@gmail.com?subject=Application for ${job.title}`}
                          className="inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 bg-gradient-to-br from-card to-accent/5 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold font-serif mb-2">No open positions currently</h3>
                  While there are currently no active listings for <span className="font-bold text-foreground">{selectedDept}</span>, we are always looking for exceptional talent to join our team.
                  <a
                    href="mailto:hussler340@gmail.com"
                    className="px-8 py-3 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-opacity"
                  >
                    Send us your resume
                  </a>
                </div>
              )}

              {!selectedDept && filteredJobs.length > 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  Don&apos;t see your role? <a href="mailto:hussler340@gmail.com" className="text-accent hover:underline">Email us</a> your resume.
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-lg dark:prose-invert lg:prose-xl mx-auto prose-headings:font-serif prose-headings:font-black prose-p:font-serif prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
          <h1 className="text-5xl mb-12 text-center text-foreground">{page.title}</h1>
          <div className="text-lg text-foreground/90 whitespace-pre-wrap">
            {page.content}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

