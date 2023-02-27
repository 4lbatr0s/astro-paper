import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://codestan.com/",
  author: "Serhat Oner",
  desc: "A minimal, responsive and SEO-friendly blog based on Astro blog theme.",
  title: "Codestan",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/4lbatr0s",
    linkTitle: `Reach on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/serhat-oner/",
    linkTitle: `Reach on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:serhatoner@proton.com",
    linkTitle: `Send an email to me`,
    active: false,
  },
];
