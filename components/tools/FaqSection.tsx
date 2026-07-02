export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Frequently Asked Questions
      </h2>
      <div className="mt-8 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{faq.question}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
