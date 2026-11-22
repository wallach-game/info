// Machine-readable profile for AI agents. Served as JSON at /api and as
// markdown at /llms.txt. Keep in sync with portfolio/index.html.

export const PROFILE = {
  name: "Jiří Kořenek",
  brand: "Numerlab",
  url: "https://numerlab.org",
  location: "Czechia (Zlín region); remote work worldwide",
  languages: ["cs", "en"],
  summary:
    "Hardware prototyping from idea to a working device: PCB, firmware, 3D-printed enclosure " +
    "and the software behind it, done by one person.",
  services: [
    {
      id: "prototype",
      name: "Prototypes",
      description:
        "An idea turned into a working prototype: circuit board, firmware and a printed enclosure, delivered as one device.",
    },
    {
      id: "electronics-firmware",
      name: "Electronics & firmware",
      description:
        "Schematic and PCB design, ESP32 and Arduino firmware, sensors, displays, USB and Wi-Fi. Design review and debugging of stuck prototypes.",
    },
    {
      id: "cad-3d-printing",
      name: "CAD & 3D printing",
      description:
        "Enclosures and functional parts in Fusion 360, including spare parts that are no longer sold.",
    },
    {
      id: "software",
      name: "Software & servers",
      description: "The app, web interface or back end the device talks to, plus Linux, Docker and automation.",
    },
  ],
  not_offered: ["Certification (CE, FCC) of products", "Mass production"],
  skills: ["ESP32", "Arduino", "PlatformIO", "KiCad", "Fusion 360", "3D printing", "JavaScript", "PHP", "MySQL", "Docker", "Linux"],
  projects: [
    {
      name: "Copper-tape PCB generator",
      status: "released",
      description: "Browser tool that turns Gerber files into 3D-printable plates for making circuit boards from copper tape.",
      url: "https://wallach-game.github.io/pcb-tape-plates/",
    },
    {
      name: "Fingerprint password keychain",
      status: "in progress",
      description: "USB-stick sized device that types passwords after a fingerprint scan. ESP32-S3, fingerprint sensor, OLED, rotary encoder.",
    },
    {
      name: "3D printer mainboard repair",
      status: "done",
      description: "Replaced a Creality K1 Max mainboard and found the cause of its crashes: a wrong motor setting made X/Y move 1.74x too far.",
    },
    { name: "3D printer head", status: "done", description: "Designed and built a 3D printer head." },
    {
      name: "E-bike spare parts",
      status: "done",
      description: "Gears, bearings and gaskets for electric bikes that were not available as spare parts, designed and printed.",
    },
  ],
  contact: {
    email: "jirklym@gmail.com",
    github: "https://github.com/wallach-game",
  },
  how_to_request: {
    channel: "email",
    include: ["What the device should do", "How many pieces", "Deadline", "Budget, if known"],
    response: "A rough time and price estimate by email.",
  },
};

export function llmsTxt(p) {
  const list = (items) => items.map((i) => `- **${i.name}**: ${i.description}${i.url ? ` (${i.url})` : ""}`).join("\n");
  return `# ${p.brand}

> ${p.summary} ${p.name}, ${p.location}.

## Services

${list(p.services)}

Not offered: ${p.not_offered.join(", ")}.

## Projects

${list(p.projects.map((x) => ({ ...x, name: `${x.name} (${x.status})` })))}

## How to request a prototype

Email ${p.contact.email} with: ${p.how_to_request.include.join(", ").toLowerCase()}. ${p.how_to_request.response}

## More

- [JSON version of this file](${p.url}/api)
- [Portfolio](${p.url})
- [GitHub](${p.contact.github})
`;
}
