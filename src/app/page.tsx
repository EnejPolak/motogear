
import Hero from '@/components/Hero';
import SuitIntroduction from '@/components/SuitIntroduction';
import GlovesIntroduction from '@/components/GlovesIntroduction';
import ShoesIntroduction from '@/components/ShoesIntroduction';

export default function Home() {
  return (
    <>
      <Hero />
      <SuitIntroduction />
      <GlovesIntroduction />
      <ShoesIntroduction />
    </>
  );
}