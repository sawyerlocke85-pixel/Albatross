// ---------------------------------------------------------------------------
// All site copy lives here. Only facts the founders supplied are used.
// Search for "TODO(content)" to find every gap that still needs real material.
// Photos live in src/assets/photos/ as full-size originals; the build makes
// resized WebP copies (the `?w=…&as=img` query) so pages stay fast.
// ---------------------------------------------------------------------------

import teamPhoto from './assets/photos/event-wide.jpg?w=960;1600;2400&format=webp&quality=78&as=img'
import sawyerPhoto from './assets/photos/sawyer-locke.jpg?w=480;960;1440&format=webp&quality=78&as=img'
import henryPhoto from './assets/photos/henry-de-roulet.jpg?w=480;960;1440&format=webp&quality=78&as=img'
import rockyPhoto from './assets/photos/rocky-jiang.jpg?w=480;960&format=webp&quality=78&withoutEnlargement=true&as=img'

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

// Left to right: Henry, Sawyer, Rocky.
export const team = {
  photo: teamPhoto,
  alt: 'Henry De Roulet, Sawyer Locke and Rocky Jiang on stage in front of the Albatross Defense logo',
  caption: 'Henry De Roulet, Sawyer Locke and Rocky Jiang presenting Albatross Defense.',
}

export const company = {
  name: 'Albatross Defense',
  founded: 2026,
  hq: 'Alexandria, Virginia',
  email: 'sawyer.locke85@gmail.com',
}

export const nav = [
  { to: '/products', label: 'Products' },
  { to: '/founders', label: 'Founders' },
  { to: '/mission', label: 'Mission' },
  { to: '/careers', label: 'Careers' },
]

export const home = {
  title: ['Launch like a rocket.', 'Fly like a plane.'],
  line: 'Zephyr Z1 boosts to about 800 ft, unfolds its wings and cruises at 80 mph on a 90 mm electric fan.',
  cta: 'See Zephyr Z1',
  // TODO(content): replace the drawing with a photo of the real Zephyr Z1 when one exists.
  imageCaption: 'Zephyr Z1 in cruise configuration, seen from above.',
  links: [
    { to: '/products', title: 'Products', text: 'Specs, the flight sequence and build updates.' },
    { to: '/founders', title: 'Founders', text: 'The 3 people building Albatross.' },
    { to: '/mission', title: 'Mission', text: 'Why the company exists.' },
    { to: '/careers', title: 'Careers', text: 'How to work with us.' },
  ],
}

export const zephyr = {
  title: 'Watch Zephyr Z1 turn into an aircraft',
  line: 'Scroll to fly it from launch to cruise.',
  phases: [
    { name: 'Launch', caption: 'A rocket booster lifts Z1 straight up with its wings folded.' },
    { name: 'Separation', caption: 'At about 800 ft the booster ejects and falls away.' },
    { name: 'Transition', caption: 'The wings swing out and the intake covers blast off, exposing the 90 mm fan.' },
    { name: 'Cruise', caption: 'Z1 flies on at 80 mph for about 25 minutes on a 6S battery.' },
  ],
  // TODO(content): add length, weight, payload, range and booster type once confirmed.
  specs: [
    ['Launch', 'Rocket booster, vertical'],
    ['Booster separation', 'About 800 ft'],
    ['Wings', 'Fold out in flight'],
    ['Wingspan', '700 mm'],
    ['Cruise propulsion', '90 mm electric ducted fan'],
    ['Cruise speed', '80 mph'],
    ['Flight time', 'About 25 minutes'],
    ['Battery', '6S'],
  ],
  // TODO(content): confirm these with the founders, or replace them with what
  // customers actually told you. They are restated from the specs, not claims.
  forCustomer: [
    'It leaves the ground on its own booster, so it does not need a runway.',
    'It cruises on an electric fan after launch, for about 25 minutes at 80 mph.',
    'Its wings stay folded until it is airborne.',
  ],
}

export const founders = {
  title: 'Meet the 3 people building Zephyr Z1',
  line: 'Sawyer, Henry and Rocky met at Episcopal High School and founded Albatross Defense in 2026.',
  people: [
    {
      name: 'Sawyer Locke',
      role: 'Co-president and founder',
      bio: 'Grew up in Asheville, North Carolina. Has always had a passion for engineering and for bringing projects to life.',
      photo: sawyerPhoto,
      focus: '58% 30%', // keeps the face in frame when cropped to a portrait
    },
    {
      // TODO(content): confirm spelling. First brief said "De Roulet", the second "De Rulet".
      name: 'Henry De Roulet',
      role: 'Co-president and founder',
      bio: 'From New York. A private pilot with a lifelong passion for engineering, 3D modeling and aviation.',
      photo: henryPhoto,
      focus: '55% 40%',
    },
    {
      name: 'Rocky Jiang',
      role: 'Co-president and founder',
      bio: 'Born in China. Passionate about drones, FPV systems, aviation, graphic design and models.',
      photo: rockyPhoto,
      focus: '50% 45%',
    },
  ],
}

export const mission = {
  title: 'Build aircraft that help keep the peace',
  // Edited from the founders' statement: "Combine innovation with passion to provide peace to the world."
  paragraphs: [
    'Albatross Defense exists to combine innovation with passion in service of a more peaceful world.',
    'We are 3 friends who met at Episcopal High School and share a love of engineering, aviation and drones. We founded the company in 2026 in Alexandria, Virginia.',
    'Our first product, Zephyr Z1, launches on a rocket booster, unfolds its wings in flight and cruises on an electric fan.',
    // TODO(content): a few sentences on the problem Albatross solves and who it is for.
  ],
}

export const careers = {
  title: 'Build Zephyr Z1 with us',
  // TODO(content): describe how the team works (hours, location, in person or remote, what a week looks like).
  intro: 'Albatross Defense is a 3-person founding team in Alexandria, Virginia.',
  // TODO(content): add real openings as { title, type, location, summary }. Leave empty if there are none.
  roles: [],
  apply: 'Email us a few lines about yourself and something you have built.',
}
