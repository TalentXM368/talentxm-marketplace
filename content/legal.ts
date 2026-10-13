import type { Seo } from "./types";

// P-25. Adapted from the Replit legal page and scoped to the website.
// Counsel review required before launch (Architecture A7, TXM-044).

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalPage {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  seo: Seo;
}

const contact = "hello@talentxm.ai";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "October 2026",
    intro:
      "This policy explains what personal information TalentXM, the operating brand of BlockTXM Inc., collects through talentxm.ai and how we use it.",
    sections: [
      {
        heading: "Information we collect",
        list: [
          "Details you submit in our forms, such as your name, work email, company, role and message.",
          "For talent network applications: skills, region, availability and an optional LinkedIn profile.",
          "Technical data such as device type, browser and pages visited, collected only after you consent to analytics.",
        ],
      },
      {
        heading: "How we use it",
        list: [
          "To reply to your enquiry and arrange any follow-up you ask for.",
          "To consider you for roles if you join the talent network.",
          "To understand how the website is used and improve it, where you have consented.",
          "To meet legal and regulatory obligations.",
        ],
      },
      {
        heading: "Where it goes",
        paragraphs: [
          "Enterprise enquiries are stored in our customer relationship system. Talent applications are stored in our recruiting system and are never used for sales outreach. We use service providers to host the website and process forms, under agreements that limit how they use your data.",
          "We do not sell personal information.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep enquiry and application records for as long as needed for the purpose they were collected, and then delete or anonymise them.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `Depending on where you live, including under the GDPR, India's Digital Personal Data Protection Act and US state privacy laws, you may have the right to access, correct or delete your information, or to object to how it is used. Email ${contact} and we will respond within the time the law requires.`,
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`BlockTXM Inc., Columbus, Ohio, United States. Email: ${contact}.`],
      },
    ],
    seo: {
      title: "Privacy Policy",
      description: "How TalentXM collects, uses and protects personal information submitted through talentxm.ai.",
    },
  },
  {
    slug: "terms",
    title: "Terms of Use",
    updated: "October 2026",
    intro:
      "These terms apply to your use of talentxm.ai. Services we provide to clients are governed by a separate written agreement.",
    sections: [
      {
        heading: "Use of the website",
        paragraphs: [
          "You may use this website to learn about TalentXM and to contact us. You agree not to misuse it, including by attempting to disrupt it, gain unauthorised access, or collect data from it by automated means.",
        ],
      },
      {
        heading: "Information on this site",
        paragraphs: [
          "We aim to keep the information on this site accurate. Descriptions of agents and services, including their status, explain what has been built and tested. They are not an offer or a guarantee of results.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The content, design and trademarks on this site belong to BlockTXM Inc. or its licensors. Third-party names and trademarks belong to their owners and are used only to describe compatibility or partnership.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "The website is provided as is. To the extent the law allows, BlockTXM Inc. is not liable for losses arising from your use of the website.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: ["These terms are governed by the laws of the State of Ohio, United States."],
      },
    ],
    seo: {
      title: "Terms of Use",
      description: "The terms that apply to your use of the TalentXM website.",
    },
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "October 2026",
    intro: "Cookies are small files stored on your device. This page explains which ones talentxm.ai uses.",
    sections: [
      {
        heading: "Essential cookies",
        paragraphs: [
          "These keep the website secure and working, for example to protect forms from abuse. They do not need consent.",
        ],
      },
      {
        heading: "Analytics cookies",
        paragraphs: [
          "If you agree, we use analytics cookies to understand which pages are useful. They are not set until you consent, and you can withdraw consent at any time.",
        ],
      },
      {
        heading: "Embedded media",
        paragraphs: [
          "Demo videos are loaded from the video host only when you choose to play them. The host may then set its own cookies.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: ["You can block or delete cookies in your browser settings. Blocking essential cookies may stop forms working."],
      },
    ],
    seo: {
      title: "Cookie Policy",
      description: "Which cookies the TalentXM website uses and how to manage them.",
    },
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    updated: "October 2026",
    intro:
      "We want talentxm.ai to be usable by everyone. We design and test against the Web Content Accessibility Guidelines (WCAG) 2.2, level AA.",
    sections: [
      {
        heading: "What we do",
        list: [
          "Keyboard access to every menu, form and control, with a visible focus indicator.",
          "Text alternatives for meaningful images and labels for every form field.",
          "Colour contrast checked against WCAG AA.",
          "Reduced motion respected where your system asks for it.",
        ],
      },
      {
        heading: "Known limitations",
        paragraphs: [
          "Some third-party content, such as embedded videos, may not fully meet these standards. We are working with providers to improve this.",
        ],
      },
      {
        heading: "Feedback",
        paragraphs: [
          `If you find a barrier on this site, email ${contact}. Tell us the page and what happened, and we will work to fix it.`,
        ],
      },
    ],
    seo: {
      title: "Accessibility Statement",
      description: "How TalentXM makes talentxm.ai accessible, and how to report a barrier.",
    },
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}
