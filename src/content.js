// ---------------------------------------------------------------------------
// All site copy and image paths live here so they can be edited in one place.
// Image paths are relative to /public. To swap a template keynote photo, drop
// the real photo into public/images/keynote/ and update the path below
// (e.g. 'images/keynote/sawyer-locke.jpg').
// ---------------------------------------------------------------------------

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const company = {
  name: 'Albatross Defense',
  founded: '2026',
  hq: 'Alexandria, Virginia',
  hqShort: 'Alexandria, VA',
  email: 'sawyer.locke85@gmail.com',
}

export const nav = [
  { id: 'company', label: 'Company' },
  { id: 'mission', label: 'Mission' },
  { id: 'zephyr', label: 'Zephyr Z1' },
  { id: 'founders', label: 'Founders' },
  { id: 'careers', label: 'Careers' },
]

export const hero = {
  eyebrow: ['Albatross Defense', `Est. ${company.founded}`, company.hqShort],
  lines: ['Launch like a rocket.', 'Fly like an '],
  accent: 'Albatross.',
  sub: 'Albatross Defense is an American aerospace startup building rocket-launched, wing-deploying unmanned aircraft. Our first platform, Zephyr Z1, boosts to altitude, unfolds its wings and transitions to efficient electric flight.',
}

export const about = {
  title: ['A new kind of aircraft company,', 'built by people who build.'],
  body: 'Albatross Defense was founded in 2026 by three friends who met at Episcopal High School and never stopped building together. From a home base in Alexandria, Virginia, we design, prototype and fly our own hardware — starting with a vehicle that launches like a rocket and flies like a plane.',
  stats: [
    { value: '2026', label: 'Founded' },
    { value: 'Alexandria, VA', label: 'Headquarters' },
    { value: '03', label: 'Founders' },
    { value: 'Zephyr Z1', label: 'First platform' },
  ],
}

export const mission = {
  statement:
    'We combine innovation with passion to build aircraft that protect people, deter conflict and help bring lasting peace to the world.',
  pillars: [
    { k: 'Innovation', v: 'Rethink how small aircraft get airborne — then prove it in the field.' },
    { k: 'Passion', v: 'A team of builders, pilots and designers who love what flies.' },
    { k: 'Peace', v: 'Technology in service of deterrence, protection and a safer world.' },
  ],
}

export const zephyr = {
  name: 'Zephyr Z1',
  title: ['A rocket that becomes', 'an ', 'aircraft', ' mid-flight.'],
  sub: 'Zephyr Z1 launches on a rocket booster, climbs to roughly 800 ft, sheds the booster, unfolds its wings and cruises on a 90 mm electric ducted fan.',
  phases: [
    {
      n: '01',
      name: 'Launch',
      desc: 'Zephyr Z1 leaves the ground on a rocket booster — wings folded, intake sealed — for a fast, clean vertical climb.',
      spec: '0 → 800 FT',
    },
    {
      n: '02',
      name: 'Separation',
      desc: 'At roughly 800 ft the spent booster is ejected and falls away, leaving the airframe free to transition.',
      spec: 'BOOSTER EJECT ≈ 800 FT',
    },
    {
      n: '03',
      name: 'Transition',
      desc: 'The wings swing out from the fuselage and the intake covers blast off, revealing a 90 mm electric ducted fan.',
      spec: 'WINGSPAN 700 MM · 90 MM EDF',
    },
    {
      n: '04',
      name: 'Cruise',
      desc: 'Zephyr Z1 settles into efficient forward flight at 80 mph, with roughly 25 minutes of endurance on a 6S battery.',
      spec: '80 MPH · ~25 MIN · 6S',
    },
  ],
  specs: [
    ['Launch', 'Rocket booster, vertical'],
    ['Booster separation', '≈ 800 ft'],
    ['Wings', 'Folding, deployed in flight'],
    ['Wingspan', '700 mm'],
    ['Cruise propulsion', '90 mm electric ducted fan'],
    ['Cruise speed', '80 mph'],
    ['Endurance', '≈ 25 minutes'],
    ['Power', '6S battery'],
  ],
}

export const launchEvent = {
  name: 'Zephyr Z1 Launch & Keynote',
  date: 'October 25, 2026',
  dateShort: '10.25.26',
  venue: 'Krimgold Park',
  city: 'Woodbine, MD',
  photo: asset('images/keynote/event-wide.jpg'),
  photoAlt: 'The Albatross Defense founders delivering the Zephyr Z1 keynote',
}

export const founders = {
  title: ['Three friends.', 'One flight path.'],
  intro:
    'Sawyer, Henry and Rocky met at Episcopal High School and have been building together ever since. In 2026 they founded Albatross Defense to turn a shared love of engineering and aviation into aircraft that matter.',
  people: [
    {
      name: 'Sawyer Locke',
      role: 'Co-President & Co-Founder',
      origin: 'Asheville, NC',
      bio: 'Sawyer grew up in Asheville, North Carolina, and attended Episcopal High School, where he met Henry and Rocky. He has always had a passion for engineering and for taking projects from an idea to something real — the instinct that drives how Albatross builds.',
      tags: ['Engineering', 'Prototyping', 'Product development'],
      photo: asset('images/keynote/sawyer-locke.jpg'),
    },
    {
      name: 'Henry De Roulet',
      role: 'Co-President & Co-Founder',
      origin: 'New York, NY',
      bio: 'Henry is from New York and is a private pilot. He brings a pilot’s perspective to Albatross, alongside a lifelong passion for engineering, 3D modeling and aviation.',
      tags: ['Private pilot', 'Engineering', '3D modeling', 'Aviation'],
      photo: asset('images/keynote/henry-de-roulet.jpg'),
    },
    {
      name: 'Rocky Jiang',
      role: 'Co-President & Co-Founder',
      origin: 'Born in China',
      bio: 'Rocky was born in China and brings a passion for drones, FPV systems, aviation, graphic design and model building to Albatross — pairing hands-on flight experience with a designer’s eye.',
      tags: ['Drones', 'FPV systems', 'Aviation', 'Graphic design', 'Models'],
      photo: asset('images/keynote/rocky-jiang.jpg'),
    },
  ],
}

export const careers = {
  title: ['Build what ', 'flies', ' next.'],
  body: 'We’re a small, hands-on team that designs, builds and flies its own hardware. If you love engineering, aviation or drones and want to work on something new, we want to hear from you.',
  areas: [
    'Aerospace & mechanical engineering',
    'Embedded & flight software',
    'Propulsion & power systems',
    'Design & manufacturing',
  ],
}

export const contact = {
  title: ['Work with ', 'Albatross', '.'],
  body: 'For partnerships, demonstrations and press, reach the founding team directly.',
}
