# Email Signature Generator - Design Specification

## Overview
Build a fully frontend-based Email Signature Generator web app using React + Tailwind CSS. Zero-login, zero-server experience with everything running in-browser using localStorage.

## UI Aesthetic
- Minimalist, Apple-like simplicity with modern creative touches
- Clean white backgrounds, subtle shadows, smooth transitions
- Mobile + desktop responsive

## Core Features

### 1. Signature Builder Form
- **Basic Fields:** Full Name, Job Title, Company Name, Email Address, Phone Number, Website URL, Address (optional), Tagline/Short bio
- **Advanced Fields:** Multiple phone numbers, Secondary email, Custom CTA (e.g., "Book a Meeting" link)

### 2. Profile & Branding
- Image Upload: Profile photo, company logo with drag-and-drop, preview, auto-resize via canvas
- Branding Controls: Primary color, Secondary color, Text color, Background color, Accent styles

### 3. Typography System
- Font family selector (Google Fonts + system fonts)
- Font size controls for Name, Title, Contact info
- Font weight, line spacing, letter spacing

### 4. Social Media Integration
- Supported: LinkedIn, Twitter (X), GitHub, Instagram, Facebook, YouTube, WhatsApp, Telegram, Custom link
- Toggle visibility per platform, reorder icons (drag-and-drop)
- Icon styles: Colored, Monochrome, Outline
- Icon size control

### 5. Signature Templates (40 Layouts)
1. Classic Left-Aligned
2. Centered Minimal
3. Horizontal Compact
4. Card Style
5. Modern Split
6. Corporate Formal
7. Creative Designer
8. Banner Header
9. Two-Tone
10. Minimal Text
11. Badge Style
12. Sidebar Accent
13. Footer Style
14. Social Focus
15. Quote Style
16. Bordered Box
17. Gradient Avatar
18. Stacked Dashed
19. Pop Shadow
20. Circle Dot
21. Dark Flip
22. Monospace
23. Availability Badge
24. Dot Pattern
25. Top Notch
26. Corner Cut
27. Box Grid
28. Label Tag
29. Ribbon Tags
30. Icon Decor
31. Gradient Strip
32. Scan Line
33. Speech Bubble
34. Tile Split
35. Stamp Border
36. Key-Value Pair
37. Code Braces
38. Dot Separators
39. Chip Tag
40. CTA Button

### 6. Live Preview Engine
- Real-time rendering as user types
- Desktop + mobile preview toggle
- Light/Dark preview background
- Zoom controls

### 7. Multi-Signature Generator
- Select templates → Select color schemes → Generate All → Grid preview
- Generate variations with different colors + layouts combined
- Custom selection (user picks templates + colors)

### 8. Export & Copy System
- Copy as HTML (for Gmail/Outlook)
- Copy as Rich Text
- Copy as plain text
- Download as .html
- Download as .png (via canvas)
- Download as .txt

### 9. Local Storage
- Save multiple signatures
- Edit existing, Delete, Duplicate

### 10. Advanced Customization
- Divider styles (line, dotted, none)
- Icon alignment (left/right/center)
- Image shape (circle/square/rounded)
- Padding/margin controls
- Border styles, Shadow effects

### 11. UX Enhancements
- Undo/Redo changes
- Reset to default
- Presets (quick start styles)
- Tooltips for each field
- Keyboard shortcuts

### 12. Accessibility
- ARIA labels
- Keyboard navigation
- High contrast mode
- Screen reader compatibility

## Technical Architecture
- **Framework:** React / Next.js
- **Styling:** Tailwind CSS
- **State:** Zustand / Context API
- **Drag & Drop:** dnd-kit
- **Icons:** Lucide / Heroicons / SVG set
- **Fonts:** Google Fonts API
- **Image Processing:** HTML5 Canvas

## Component Structure
```
/components
  /builder
    FormInputs.tsx
    BrandingControls.tsx
    TypographyControls.tsx
  /preview
    SignaturePreview.tsx
    TemplateRenderer.tsx
  /templates
    Template1.tsx - Template40.tsx
  /export
    CopyButton.tsx
    DownloadButton.tsx
  /shared
    ColorPicker.tsx
    FontSelector.tsx
```

## Data Model
```json
{
  "id": "uuid",
  "name": "",
  "title": "",
  "company": "",
  "email": "",
  "phone": "",
  "website": "",
  "address": "",
  "tagline": "",
  "image": "base64",
  "logo": "base64",
  "colors": {
    "primary": "#000000",
    "secondary": "#666666",
    "text": "#333333",
    "background": "#ffffff"
  },
  "fonts": {
    "family": "Arial",
    "size": {
      "name": 16,
      "title": 14,
      "contact": 12
    }
  },
  "socials": [
    {
      "type": "linkedin",
      "url": "",
      "enabled": true
    }
  ],
  "template": "classic",
  "divider": "solid",
  "imageShape": "circle"
}
```

## Email Client Compatibility
- Use inline CSS only
- Avoid external stylesheets
- Table-based layout fallback

## Edge Cases
- Missing image → fallback avatar
- Long names → wrap/ellipsis
- Invalid URLs → validation warning
- Email client compatibility
