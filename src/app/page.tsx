import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Education } from '@/components/Education';
import { Experience } from '@/components/Experience';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Proof } from '@/components/Proof';
import { Skills } from '@/components/Skills';
import { Sources } from '@/components/Sources';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Proof />
      <Sources />
      <Skills />
      {/* Research section hidden for now: restore <Research /> and the nav entry to show it again. */}
      <Education />
      <Contact />
    </>
  );
}
