import { Link } from 'react-router-dom';

const sections = [
  ['1. About Garbamate', <>Garbamate is a platform that helps users discover and connect with suitable Garba partners for events, celebrations, and social occasions.</>, <>Garbamate facilitates connections between users and listed partners. Unless specifically stated otherwise, Garbamate does not guarantee the availability, suitability, behavior, or compatibility of any particular partner.</>],
  ['2. Partner Matching', <>Garbamate allows users to select or communicate their preferred partner requirements where such options are available.</>, <><strong>Partner matching is based on the preferences and availability selected by the user. A particular gender or type of partner is not guaranteed or mandatory unless explicitly specified as part of a particular booking or service.</strong></>, <>Users should review the available partner information before confirming a booking.</>],
  ['3. Eligibility', <>You must provide accurate information when creating an account or making a booking.</>, <>Users must meet the minimum age requirement displayed by Garbamate and comply with all applicable laws and regulations.</>, <>You are responsible for maintaining the confidentiality of your account information.</>],
  ['4. Bookings', <>A booking is considered confirmed only after the required booking process has been successfully completed.</>, <>Availability may change, and Garbamate may not be able to guarantee a particular partner until the booking is confirmed.</>, <>Users are responsible for providing accurate event details, including date, time, location, and other information requested during booking.</>],
  ['5. Partner Conduct', <>All users and partners are expected to behave respectfully and appropriately.</>, <>The platform must not be used for harassment, threats, discrimination, exploitation, or any unlawful activity.</>, <>Garbamate reserves the right to suspend or terminate accounts involved in inappropriate, abusive, fraudulent, or unlawful behavior.</>],
  ['6. Payments and Fees', <>Where applicable, prices and platform fees will be displayed before a booking is confirmed.</>, <>Users are responsible for paying the applicable amount shown during the booking process.</>, <>Any additional charges, if applicable, will be communicated before they become payable.</>],
  ['7. Cancellation and Refunds', <>Cancellation and refund eligibility will depend on the cancellation policy applicable to the specific booking.</>, <>Garbamate may establish different cancellation windows or refund conditions for different services.</>, <>Where a partner becomes unavailable, Garbamate may attempt to provide an alternative arrangement where reasonably possible.</>],
  ['8. User Responsibility', <>Users are responsible for their interactions with partners and for providing accurate information.</>, <>Garbamate should not be used to request or arrange services that are illegal or unrelated to the intended Garba-partner service.</>, <>Users should exercise reasonable judgment when meeting or interacting with another person through the platform.</>],
  ['9. Safety', <>Garbamate is intended to facilitate social and cultural connections around Garba activities and events.</>, <>Users should meet partners in appropriate public or event locations and should not share sensitive personal information unnecessarily.</>, <>Any concerns regarding inappropriate behavior, safety, or misconduct should be reported to Garbamate through the available support channels.</>],
  ['10. Content and Profiles', <>Users and partners may provide photographs, descriptions, names, preferences, and other profile information.</>, <>You agree that the information you provide must be accurate and must not infringe another person's rights.</>, <>Garbamate may remove content that is misleading, inappropriate, unlawful, or inconsistent with these Terms.</>],
  ['11. Platform Availability', <>Garbamate does not guarantee that the platform or every feature will always be available or uninterrupted.</>, <>We may modify, suspend, or discontinue features of the platform when necessary for maintenance, security, improvement, or other operational reasons.</>],
  ['12. Limitation of Liability', <>Garbamate acts as a platform facilitating connections between users and partners.</>, <>To the extent permitted by applicable law, Garbamate is not responsible for losses, disputes, injuries, misconduct, or other issues arising directly from interactions between users and partners, except where liability cannot legally be excluded.</>],
  ['13. Privacy', <>Your use of Garbamate is also subject to our <strong>Privacy Policy</strong>, which explains how information is collected, used, stored, and processed.</>],
  ['14. Changes to These Terms', <>Garbamate may update these Terms from time to time.</>, <>Updated Terms will be made available on the platform. Continued use of Garbamate after an update constitutes acceptance of the revised Terms.</>],
  ['15. Contact', <>If you have questions, concerns, or complaints regarding these Terms or the Garbamate platform, please contact us through the support/contact option provided on the website.</>],
];

export default function TermsAndConditions() {
  return <article className="terms-page">
    <header className="terms-header">
      <span className="terms-kicker">A clear path to joyful dancing</span>
      <h1>Terms &amp; Conditions</h1>
      <p className="terms-updated">Last Updated: October 2, 2026</p>
    </header>
    <div className="terms-card">
      <p className="terms-intro">Welcome to <strong>Garbamate</strong>. These Terms &amp; Conditions (“Terms”) govern your use of the Garbamate platform, including browsing, booking, listing, and renting Garba partners for social and cultural events.</p>
      <p className="terms-intro">By creating an account or using Garbamate, you agree to these Terms.</p>
      {sections.map(([heading, ...paragraphs]) => <section className="terms-section" key={heading}><h2>{heading}</h2>{paragraphs.map((paragraph, index) => <p key={`${heading}-${index}`}>{paragraph}</p>)}</section>)}
      <p className="terms-closing"><strong>By using Garbamate, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions.</strong></p>
    </div>
    <p className="mt-6 text-center text-sm text-slate-500"><Link className="font-semibold text-maroon" to="/signup">Return to signup</Link></p>
  </article>;
}
