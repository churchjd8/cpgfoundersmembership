import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - CPG Founders Group",
  description:
    "How CPG Founders Group collects, uses, and protects information, including data accessed through Meta Platforms.",
};

const effectiveDate = "May 20, 2026";
const contactEmail = "info@teamchurch.co";

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted">Effective {effectiveDate}</p>
        </header>

        <div className="space-y-8 text-base leading-relaxed">
          <p>
            CPG Founders Group (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
            cpgfoundersgroup.com and related services. This policy explains what information we
            collect, how we use it, and the choices you have. We keep it short and plain.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-3">1. Information we collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Information you give us</strong> — name, email, business name, and message
                content when you fill out our contact, application, or workshop forms.
              </li>
              <li>
                <strong>Usage data</strong> — pages visited, referring source, device type, and
                approximate location, collected via Vercel Web Analytics and Cloudflare Web
                Analytics. These services are configured to not use cookies or fingerprinting.
              </li>
              <li>
                <strong>Email engagement</strong> — opens, clicks, and replies when you receive
                emails from us, via our email service provider.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. How we use it</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and deliver requested resources.</li>
              <li>Operate and improve cpgfoundersgroup.com and our programs.</li>
              <li>Send program updates, educational content, and offers you can unsubscribe from at any time.</li>
              <li>Comply with legal obligations and protect against fraud or abuse.</li>
            </ul>
            <p className="mt-3">We do not sell your personal information.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. Meta Platforms (Facebook &amp; Instagram) data</h2>
            <p>
              We operate internal tools that connect to our own Meta Business Manager and Meta
              Ads accounts in order to manage CPG Founders Group&rsquo;s advertising. When an
              authorized team member grants access through Meta&rsquo;s OAuth flow, our tools may
              read and write the following on accounts we own or have been granted access to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Ad account, campaign, ad set, ad, and creative metadata.</li>
              <li>Performance insights (impressions, clicks, spend, conversions).</li>
              <li>Business Manager assets we administer (Pages, Pixels, audiences).</li>
            </ul>
            <p className="mt-3">
              These tools are used solely to operate our own advertising. We do not access the
              personal Facebook or Instagram profiles of any individual end user, and we do not
              receive contact information of people who interact with our ads beyond what Meta
              shows in standard insights and lead form submissions you have voluntarily filled
              out. Access tokens are stored by our authorization provider (Composio) using
              industry-standard encryption and are scoped to the minimum permissions required.
              Tokens can be revoked at any time from your Meta Business Settings under
              &ldquo;Business Integrations.&rdquo;
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Third parties we use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vercel (hosting and analytics)</li>
              <li>Cloudflare (DNS and analytics)</li>
              <li>Composio (authorization and tool orchestration)</li>
              <li>Meta Platforms (advertising)</li>
              <li>Email service providers used for transactional and marketing email</li>
            </ul>
            <p className="mt-3">
              Each is bound by its own privacy and security commitments. We only share what is
              necessary for them to perform their function.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Data retention</h2>
            <p>
              We retain contact and engagement records for as long as you remain a subscriber or
              customer, plus a reasonable period thereafter for legal and accounting purposes.
              Meta access tokens are retained only while the integration is active and are
              deleted when access is revoked.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Your choices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Unsubscribe from any marketing email using the link at the bottom of the message.</li>
              <li>
                Request a copy of, correction to, or deletion of your personal information by
                emailing{" "}
                <a className="text-accent underline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                . We respond within 30 days.
              </li>
              <li>
                Revoke our app&rsquo;s access to your Meta accounts at any time via{" "}
                <a
                  className="text-accent underline"
                  href="https://www.facebook.com/settings?tab=business_tools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook Business Integrations
                </a>
                .
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Data deletion requests</h2>
            <p>
              To request deletion of any data we hold about you, email{" "}
              <a className="text-accent underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>{" "}
              with the subject line &ldquo;Data Deletion Request&rdquo; and the email address or
              identifier you used with us. We will confirm completion in writing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. Children</h2>
            <p>
              Our services are for business professionals. We do not knowingly collect
              information from anyone under 16.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. Changes to this policy</h2>
            <p>
              If we make material changes, we will update the effective date at the top and, when
              appropriate, notify you by email.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
            <p>
              Questions about this policy?{" "}
              <a className="text-accent underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </p>
          </div>

          <div className="pt-6 border-t border-border">
            <Link href="/" className="text-accent underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
