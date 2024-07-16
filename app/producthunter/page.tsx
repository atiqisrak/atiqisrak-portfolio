"use client";
import Head from "next/head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import About from "@/components/About";
import ExpCard from "@/components/ExpCards";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function ProductHunter() {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateAuraPosition = (e: MouseEvent) => {
      if (auraRef.current) {
        auraRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        auraRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("pointermove", updateAuraPosition);

    return () => {
      window.removeEventListener("pointermove", updateAuraPosition);
    };
  }, []);
  return (
    <>
      <Head>
        <style jsx global>{`
          body {
            font-family: "${inter.style.fontFamily}";
          }
        `}</style>
      </Head>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div ref={auraRef} className="mouse-aura" />
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Nav />
          <main className="flex flex-col pt-6 lg:pt-24 lg:w-1/2 lg:py-24 gap-8">
            <h1 className="text-3xl font-bold">Get Your Product Noticed on Product Hunt – For Free!</h1>
            <section>
              <h2 className="text-2xl font-semibold">Why Choose My Free Product Hunt Services?</h2>
              <p>Are you launching a new product and want to make a splash on Product Hunt? I&apos;m here to help you succeed without any cost! With a deep understanding of what makes products stand out on Product Hunt, I offer comprehensive services to ensure your product gets the attention it deserves.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">What I Offer</h2>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Detailed Product Review:</strong> I will thoroughly check and test your product, providing you with a detailed review that highlights strengths and areas for improvement.
                </li>
                <li>
                  <strong>Constructive Feedback:</strong> Receive actionable feedback aimed at refining your product and its presentation to attract more upvotes and positive comments.
                </li>
                <li>
                  <strong>Comment Engagement:</strong> I will actively comment on your Product Hunt post, engaging with other users to create a buzz around your product.
                </li>
                <li>
                  <strong>Voting and Promotion:</strong> I will upvote your product and encourage my network to do the same, giving your launch a significant boost.
                </li>
                <li>
                  <strong>Continuous Support:</strong> I offer ongoing support throughout your Product Hunt campaign, ensuring you stay on top of any comments and feedback.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">How It Works</h2>
              <ol className="list-decimal pl-6">
                <li><strong>Submit Your Product:</strong> Simply provide the details of your product and your Product Hunt listing.</li>
                <li><strong>Product Testing:</strong> I will use your product and compile a thorough review and feedback report.</li>
                <li><strong>Launch Day Engagement:</strong> On your launch day, I will comment and engage with your post on Product Hunt, ensuring maximum visibility.</li>
                <li><strong>Post-Launch Support:</strong> I will continue to support your product by responding to comments and providing additional feedback as needed.</li>
              </ol>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">Why Am I Offering This for Free?</h2>
              <p>Building a strong community of innovative products is my passion. By offering these services for free, I aim to help more creators bring their ideas to life and succeed in their entrepreneurial journey.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">Get Started Today!</h2>
              <p>Ready to make your product stand out on Product Hunt? Contact me today to get started. Let&apos;s 
                make your launch a success together!</p>


              {/* <p><strong>Contact Information:</strong></p>
            <p>Email: <a href="mailto:atiqisrak@gmail.com">atiqisrak@gmail.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/atiq-israk" target="_blank" rel="noopener noreferrer">linkedin.com/in/atiq-israk</a></p>
            <p>Portfolio: <a href="https://atiqisrak.vercel.app" target="_blank" rel="noopener noreferrer">atiqisrak.vercel.app</a></p> */}

              <div className="flex flex-row justify-center items-center gap-4 lg:px-6 mb-4 mt-4">
                <a
                  href="mailto:atiqisrak@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:cursor-pointer w-full"
                >
                  <Button variant={"default"} className="w-full h-full">
                    <div className="flex flex-row items-center">
                      <Mail className="dark:text-white text-muted h-6 w-6" />
                      <p className="ml-3 text-2xl dark:text-white text-muted">
                        Hello Hunter
                      </p>
                    </div>
                  </Button>
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
