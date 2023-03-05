import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://serhatcodes.com",
  author: "Serhat Oner",
  desc: "Discover the latest in JavaScript, C#, and other software technologies on serhatcodes.com - the minimal and responsive blog by Serhat Oner. Stay up-to-date with insightful articles and tutorials that explore the ever-evolving world of tech",
  title: "serhatcodes.com",
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
