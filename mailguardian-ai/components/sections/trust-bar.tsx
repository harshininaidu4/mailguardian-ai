import { CompanyLogo } from '@/components/shared/company-logo';
import { trustedCompanies } from '@/lib/content';

export function TrustBar() {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-border/60 bg-white/[0.015] py-12">
      <div className="container">
        <h2 id="trust-heading" className="text-center font-sans text-sm font-normal tracking-normal text-muted-foreground">
          Trusted by security teams at
        </h2>
        <ul className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {trustedCompanies.map((company) => (
            <li key={company.name}>
              <CompanyLogo name={company.name} mark={company.mark} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
