# Jagran Carnival Event Integration Plan

## 1) Goal

Convert the current Pixelcraft-style landing page UI into a Jagran Carnival event page without changing the visual language (dark brutalist style, yellow highlights, bold uppercase headings, monospace support text).

This plan integrates:

- Event 1 (Day 1): Startup Stall Expo-2026
- Event 2 (Day 2): JAGRANPRENEURS Startup Idea Pitching Competition-2026
- Additional flow: Audience / Alumni / Panelist registration

## 2) Core Event Facts to Preserve

- Event name umbrella: Jagran Carnival
- Day 1 date: 24 April 2026
- Stall registration submission deadline: 15 April 2026
- Stall fee (Day 1): Rs. 2,500 for one-day exhibition stall
- Target participants for stalls: Brands, Influencers, Open-source projects, Startups
- Host mention for Day 2: Jagran Incubation & Entrepreneurship Cell (JIEC)
- Theme line: "No Problem is too big... No idea is too small"

## 3) Current UI Structure (Already in Code)

Main flow in page:

1. Navbar
2. Hero
3. Logos
4. Features
5. How It Works
6. Stats
7. Testimonials
8. Bento
9. FAQ
10. Pricing
11. Final CTA
12. Footer

Section IDs currently used in nav and anchors:

- features
- comparison
- faq
- pricing

## 4) Section-by-Section Integration Mapping

### Navbar

Replace current menu labels with event navigation:

- EXPO (links to features)
- PITCH (links to pricing)
- TIMETABLE (new section anchor: timetable)
- FAQ (links to faq)
- REGISTER (links to pricing)

Right-side CTA:

- Primary button: REGISTER NOW
- Secondary link: DOWNLOAD BROCHURE

### Hero (Top Fold)

Purpose: Immediately explain Jagran Carnival + 2-day format + clear action.

Proposed badge:

- [LIVE] // JAGRAN CARNIVAL 2026 REGISTRATIONS OPEN

Proposed headline:

- BUILD. PITCH. CONNECT.
- AT JAGRAN CARNIVAL 2026.

Proposed subheading:

- 2 DAYS. 2 HIGH-IMPACT STARTUP EVENTS.
- DAY 1: STARTUP STALL EXPO.
- DAY 2: JAGRANPRENEURS IDEA PITCH.

Primary CTA:

- REGISTER FOR DAY 1 / DAY 2

Secondary CTA:

- VIEW EVENT DETAILS

Hero trust strip text:

- DEADLINE: 15 APRIL 2026 // EXPO DATE: 24 APRIL 2026 // STALL FEE: RS. 2,500

### Logos (Partners / Ecosystem)

Repurpose as credibility strip:

- SUPPORTED BY STARTUP COMMUNITY, ALUMNI, FACULTY, INDUSTRY MENTORS

Replace placeholder logos with:

- JIEC
- STARTUP CLUBS
- ALUMNI NETWORK
- INDUSTRY MENTORS
- CAMPUS INNOVATION CELL

### Features -> Day 1: Startup Stall Expo

Use 3 cards:

1. STALL REGISTRATION
2. EXHIBITOR BENEFITS
3. WHO SHOULD APPLY

Card copy:

- STALL REGISTRATION:
  - Present your ideas, products, and innovations to a high-intent audience.
- EXHIBITOR BENEFITS:
  - Brand visibility and networking
  - Fully equipped stall space
  - Dedicated SPOC support
  - Startup story showcase
  - Direct audience feedback
  - Felicitation for nominated exhibitors
  - Complimentary lunch for 2 members
- WHO SHOULD APPLY:
  - Startups, brands, influencers, open-source teams, student ventures

### How It Works -> Registration Flow

3-step cards:

1. CHOOSE YOUR TRACK
   - Day 1 Expo, Day 2 Pitch, or Audience/Alumni/Panelist pass
2. SUBMIT THE FORM
   - Fill details and upload required information in the registration form
3. RECEIVE CONFIRMATION
   - Team review and participation confirmation via email/phone

### Stats -> High-impact Numbers

Replace with factual event numbers:

- 2 DAYS
- 2 FLAGSHIP EVENTS
- 15 APRIL 2026 DEADLINE
- RS. 2,500 STALL FEE

### Testimonials -> Social Proof / Voice Blocks

Convert to static quotes from organizer perspective:

1. "A PLATFORM WHERE IDEAS MEET OPPORTUNITY."
2. "FROM CAMPUS INNOVATORS TO FOUNDERS, EVERY VOICE MATTERS."
3. "PITCH WITH PURPOSE. BUILD WITH IMPACT."

Attribution examples:

- JIEC ORGANIZING TEAM
- INDUSTRY MENTOR NETWORK
- STARTUP OUTREACH DESK

### Bento -> Event Value Blocks

Use this as 6 capability tiles:

- Networking with industry leaders
- Product and idea visibility
- Live audience feedback
- Entrepreneurial culture building
- Alumni and faculty collaboration
- Recognition and growth opportunities

### Creative Section -> 2-Day Timetable (New)

Use one bold timeline section that matches the dark + yellow brutalist theme.

Section label and title:

- [05] // TIMETABLE
- TWO DAYS. ONE CARNIVAL.
- THE COMPLETE FLOW, HOUR BY HOUR.

Visual direction (theme-matching):

- Layout: split-screen timeline with DAY 1 on left and DAY 2 on right
- Timeline style: pixel blocks + vertical connector line + yellow active markers
- Micro labels: "LIVE", "UPCOMING", "REGISTRATION DESK OPEN"
- Mobile fallback: stacked accordion timeline cards

Day 1 (Startup Stall Expo) sample schedule copy:

- 09:00 AM - REGISTRATION DESK & STALL CHECK-IN
- 10:00 AM - INAUGURAL WALKTHROUGH
- 11:00 AM - STARTUP STALL SHOWCASE BEGINS
- 01:30 PM - NETWORKING LUNCH
- 03:00 PM - MENTOR & INVESTOR INTERACTIONS
- 05:30 PM - FELICITATION OF NOMINATED EXHIBITORS

Day 2 (JAGRANPRENEURS Pitch) sample schedule copy:

- 09:30 AM - PARTICIPANT REPORTING & BRIEFING
- 10:30 AM - IDEA PITCH ROUND 1
- 12:30 PM - JURY HUDDLE + FEEDBACK BLOCK
- 02:00 PM - PANEL DISCUSSION: FROM IDEA TO IMPACT
- 03:30 PM - FINAL PITCH ROUND
- 05:00 PM - JAGRANPRENEUR CROWN & CLOSING CEREMONY

Section CTA line:

- WANT TO PRESENT IN THE SPOTLIGHT? REGISTER YOUR TRACK NOW.

### FAQ

Replace current product FAQs with event FAQs:

- WHO CAN REGISTER FOR A STALL?
- WHAT IS THE LAST DATE FOR STALL REGISTRATION?
- WHAT IS INCLUDED IN RS. 2,500 STALL FEE?
- WHO CAN PARTICIPATE IN JAGRANPRENEURS PITCH?
- CAN ALUMNI OR PROFESSIONALS JOIN AS PANELISTS?
- HOW WILL CONFIRMATION BE SHARED?

### Pricing -> Registration Cards

Repurpose as 3 registration cards:

1. DAY 1 EXPO STALL
   - Price: RS. 2,500
   - Includes benefits list
   - Button: REGISTER EXPO STALL
2. DAY 2 IDEA PITCH
   - Price: NO FEE (or "AS PER GUIDELINES" if final fee pending)
   - Button: REGISTER FOR PITCH
3. AUDIENCE / ALUMNI / PANEL
   - Price: FREE REGISTRATION
   - Button: REGISTER AS DELEGATE

### Final CTA

New final message:

- READY TO BUILD YOUR STARTUP STORY?
- JOIN JAGRAN CARNIVAL 2026 AND TAKE THE NEXT STEP.

Buttons:

- REGISTER NOW
- CONTACT ORGANIZING TEAM

## 5) Long-form Copy Block (About Section Draft)

This can be placed in an About section (new) or split across Hero + Features + FAQ:

"Jagran Carnival 2026 brings together innovators, startups, students, alumni, faculty, and industry leaders on one high-energy platform. Across two focused days, participants can showcase products at the Startup Stall Expo and present bold ideas at the JAGRANPRENEURS Startup Idea Pitching Competition. Hosted by the Jagran Incubation & Entrepreneurship Cell (JIEC), the event is designed to foster entrepreneurial culture, accelerate innovation, and build meaningful collaboration through exposure, mentorship, and direct audience engagement."

## 6) Content and Tone Guidelines for This UI

- Keep section headings short, bold, uppercase.
- Keep support text concise, factual, and action-oriented.
- Use high-contrast hooks in badges and CTA buttons for deadlines and dates.
- Keep every major section ending with one direct action line.

## 7) Form Text Suggestions

Use these labels in registration forms:

- Full Name
- Startup / Organization Name
- Category (Startup / Brand / Influencer / Open-source / Student)
- Contact Number
- Email Address
- City / Institution
- Track Selection (Day 1 Expo / Day 2 Pitch / Audience-Alumni / Panelist)
- Brief Startup / Idea Description
- Website / Social Links (optional)
- Team Size
- Consent checkbox: "I confirm the submitted details are accurate."

Submit button labels:

- SUBMIT REGISTRATION
- SAVE AND CONTINUE

Success message:

- REGISTRATION SUBMITTED SUCCESSFULLY. OUR TEAM WILL CONTACT YOU SOON.

## 8) Implementation Order (Recommended)

1. Update Hero + Navbar copy first (instant theme shift)
2. Replace Features, How It Works, Stats with event data
3. Add new Timetable section (creative 2-day schedule block)
4. Convert Pricing into registration cards
5. Update FAQ and Final CTA
6. Replace remaining placeholder sections (Testimonials, Logos)
7. Wire CTAs to form routes and Google Form links

## 9) Final Note

This plan keeps your existing UI structure and visual identity intact while fully transforming the page into a Jagran Carnival event experience with clear copy, event hierarchy, and conversion-focused registration flow.
