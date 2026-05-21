import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/marketplace";

const FaqSection = () => (
  <section id="faq" className="container mx-auto px-4 py-16">
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Launch FAQ
        </p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Questions the first version should answer</h2>
        <p className="text-muted-foreground">
          The site now communicates what Rentiverse is, how it works, and why it can launch credibly before every back-office flow is fully automated.
        </p>
      </div>

      <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
        {faqItems.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
