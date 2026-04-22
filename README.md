# ✉️ Email Signature Maker — Studio Pro

> A premium, fully browser-based email signature generator. Zero login, zero server. Everything runs in your browser.

![Email Signature Maker](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🖥️ Live Preview

The app features a **real-time split-pane interface** — edit on the left, see a live email-client mockup on the right. Every keystroke updates the preview instantly.

---

## ✨ Features

### 🏗️ Builder Panel
| Tab | What's Inside |
|---|---|
| **Profile** | Name, job title, company, email, phone, website, address, tagline, CTA — plus drag-and-drop photo & logo upload with canvas auto-resize |
| **Template** | 20 production-ready layouts with instant visual switching |
| **Colors** | 8 curated palette presets + 5 fully custom color pickers |
| **Font** | Searchable font selector (22 fonts), weight picker, size & spacing sliders |
| **Social** | 8 platforms with real SVG brand icons, URL inputs, icon style (colored / mono / outline) |
| **Advanced** | Image shape (circle / square / rounded), divider styles, signature naming |
| **Export** | Copy HTML, copy plain text, download `.html`, download `.png` |

### 🪟 Live Preview Panel
- Email client chrome mockup (macOS-style with traffic light buttons, From / To / Subject header)
- **Desktop ↔ Mobile** toggle
- **Light ↔ Dark** preview background
- **Zoom controls** (50% – 150%)
- Vertically centered, dot-grid canvas background

### 🎨 20 Signature Templates
| # | Name | Style |
|---|---|---|
| 1 | Classic Left | Timeless left-aligned with avatar |
| 2 | Centered Minimal | Clean centered layout |
| 3 | Horizontal Compact | Single-row with vertical divider |
| 4 | Card Style | Rounded card with border |
| 5 | Modern Split | Colored left panel + white right |
| 6 | Corporate Formal | Header bar + formal layout |
| 7 | Creative Designer | Gradient accent bar |
| 8 | Banner Header | Full-width gradient header |
| 9 | Two-Tone | Split color columns |
| 10 | Minimal Text | Text-only, no images |
| 11 | Badge Style | Company pill badge |
| 12 | Sidebar Accent | Gradient vertical accent |
| 13 | Social Focus | Expanded platform link list |
| 14 | Quote Style | Prominent tagline blockquote |
| 15 | Bordered Box | Top color strip + boxed card |
| 16 | Gradient Ring | Glowing gradient avatar border |
| 17 | Pop Shadow | Bold offset box-shadow |
| 18 | Dark Glass | Dark glassmorphism card |
| 19 | Dev Code | Syntax-highlighted code block |
| 20 | Availability Badge | Green "Available" pulse pill |

> All templates use **inline CSS only** and **table-based layouts** for full Gmail / Outlook / Apple Mail compatibility.

### ⚙️ State & UX
- **Undo / Redo** — 50-step history (`Ctrl+Z` / `Ctrl+Y`)
- **Auto-save** — `Ctrl+S` saves to `localStorage`
- **Toast notifications** — feedback on every copy, save, and export action
- **Collapsible sidebar** — collapse the builder panel to give the preview full screen width
- **VS Code-style icon navigation** — vertical icon rail with hover tooltips

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/venkateshcreations/Signature-Maker.git

# Navigate into the project
cd email-signature-maker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🗂️ Project Structure

```
email-signature-maker/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + Google Fonts + ToastProvider
│   │   ├── page.tsx            # Main page — split-pane shell + keyboard shortcuts
│   │   └── globals.css         # Design system tokens, component utilities, slider CSS
│   ├── lib/
│   │   ├── types.ts            # SignatureData model, default values, all TypeScript types
│   │   ├── store.ts            # Zustand store — state, undo/redo, localStorage
│   │   └── exportUtils.ts      # HTML generation, PNG export, clipboard helpers
│   └── components/
│       ├── layout/
│       │   ├── TopBar.tsx          # Branding, undo/redo, save, reset
│       │   └── BuilderPanel.tsx    # Vertical icon sidebar + collapsible content panel
│       ├── builder/
│       │   ├── ProfileForm.tsx         # All profile fields + image upload
│       │   ├── BrandingControls.tsx    # Color palettes + custom color pickers
│       │   ├── TypographyControls.tsx  # Font selector, weights, size sliders
│       │   ├── SocialLinksForm.tsx     # Platform toggles + SVG brand icons
│       │   ├── TemplateGallery.tsx     # 20-template gallery grid
│       │   └── AdvancedControls.tsx    # Shape, dividers, signature naming
│       ├── preview/
│       │   └── PreviewPanel.tsx    # Email chrome mockup + live render + controls
│       ├── templates/
│       │   ├── AllTemplates.tsx    # Templates 1–10 (inline CSS, email-safe)
│       │   └── MoreTemplates.tsx   # Templates 11–20 (inline CSS, email-safe)
│       ├── export/
│       │   └── ExportPanel.tsx     # HTML / PNG / text export with toast feedback
│       └── shared/
│           ├── ColorPicker.tsx     # Hex input + native color picker + preset swatches
│           ├── FontSelector.tsx    # Searchable dropdown with live font preview
│           ├── Slider.tsx          # Custom range slider with gradient track + glow thumb
│           ├── Toggle.tsx          # Animated switch with glow effect
│           └── Toast.tsx           # Toast notification system (success / error / info)
├── docs/
│   └── spec.md                 # Original feature specification
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14.2 | React framework + App Router |
| [React](https://react.dev/) | 18 | UI library |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first styling + design tokens |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Zustand](https://zustand-demo.pmnd.rs/) | 4.5 | Global state + undo/redo history |
| [html2canvas](https://html2canvas.hertzen.com/) | 1.4 | PNG export |
| [Lucide React](https://lucide.dev/) | 0.378 | UI icons |
| [clsx](https://github.com/lukeed/clsx) | 2.1 | Conditional className utility |
| [Google Fonts](https://fonts.google.com/) | — | Inter + Plus Jakarta Sans |

---

## 📧 Email Client Compatibility

All signature templates are built to be safe across email clients:

| Feature | Status |
|---|---|
| Inline CSS only | ✅ |
| Table-based layout | ✅ |
| No external stylesheets | ✅ |
| Base64 image support | ✅ |
| Web-safe font fallbacks | ✅ |
| Gmail compatible | ✅ |
| Outlook compatible | ✅ |
| Apple Mail compatible | ✅ |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Ctrl + Shift + Z` | Redo (alternate) |
| `Ctrl + S` | Save signature to library |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository: [github.com/venkateshcreations/Signature-Maker](https://github.com/venkateshcreations/Signature-Maker)
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Venkatesh Ammireddy**

- GitHub: [@venkateshcreations](https://github.com/venkateshcreations)
- LinkedIn: [Venkatesh Ammireddy](https://www.linkedin.com/in/venkateshammireddy/)

---

<div align="center">

Made with ❤️ by **Venkatesh Ammireddy**

⭐ Star this repo if you found it useful!

</div>
