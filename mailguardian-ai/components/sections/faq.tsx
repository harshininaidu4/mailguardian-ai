import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '@/lib/content';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 lg:py-32">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionHeading id="faq-heading" eyebrow="FAQ" title="Questions security teams ask first" />
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem key={item.question} value={`faq-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
