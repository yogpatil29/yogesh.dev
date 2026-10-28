# Yogesh Patil — Portfolio

Personal portfolio for a Java Full Stack Developer. Built with **React 18 + Vite**, **Framer Motion** and **Lucide** icons, styled with hand-written CSS (no UI framework).

## Quick start

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173 (use `npm run dev -- --port 5180` if 5173 is busy)
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Project structure

```
public/
  favicon.svg
  resume/Yogesh_Patil_Resume.pdf   ← your resume (download button uses this)
  projects/                        ← put project screenshots here
src/
  data/portfolio.js                ← ALL personal content lives here
  components/                      ← one component per section + shared UI
  hooks/                           ← active-section tracking, resume availability check
  App.jsx  main.jsx  index.css
index.html                         ← page title, meta description, Open Graph tags
```

## Customising content

Everything is in **`src/data/portfolio.js`**. Components only read from it.

- An empty string `''` or empty array `[]` means "not provided yet".
- In `npm run dev`, missing items appear as dashed yellow **Placeholder** badges.
- In the production build, placeholders are hidden automatically.

### Things you still need to fill in or confirm

| Where (`portfolio.js`) | What |
| --- | --- |
| `socials.github` | Your GitHub profile URL (GitHub icons stay hidden until set) |
| `projects[].links.github / .live` | Repo / demo URLs per project (buttons hidden until set) |
| `projects[].tech` | Confirm the stack for each project (marked `TODO`) |
| `projects[1].features` | The names of the ERP modules you built |
| `projects[2].role` | Confirm your role on Taskistics |
| `projects[].image` | Screenshot paths (see below) |
| `experience[0].location` | Optional office location |
| `about.achievements` | Awards, recognitions, etc. |
| `certifications`, `courses` | Your certifications and courses |
| `education[].details` | Optional grades / specialisation |
| `resume.lastUpdated` | Optional, e.g. `'October 2026'` |
| `profile.showPhone` | Set `false` to hide your phone number publicly |
| `contact.formEndpoint` | Contact form backend (see below) |
| `index.html` | Replace `https://your-domain.com` in Open Graph tags, add `public/og-image.png` (1200×630) |

## Resume PDF

The site serves `public/resume/Yogesh_Patil_Resume.pdf`. To update it, replace that file and keep the same name, or change `resume.path`. If the file is missing, the buttons switch to **"Request Resume by Email"**, so there's never a broken download link.

## Project screenshots

1. Save images in `public/projects/`, e.g. `public/projects/evisa.png`. Use a 16:10 ratio, about 1280×800. WebP or optimised PNG.
2. Set `image: '/projects/evisa.png'` on the project in `portfolio.js`.

Until an image is set, each project shows its built-in illustrated thumbnail. Don't publish screenshots that contain real client or user data.

## Contact form

The form validates on the client. Where it sends depends on `contact.formEndpoint`:

- **Empty (default):** nothing is sent. The visitor sees a clear "not sent" notice and a button that opens their email app with the message pre-filled.
- **Formspree (no backend needed):** create a form at formspree.io and set `formEndpoint: 'https://formspree.io/f/xxxxxxx'`.
- **Your own API:** the form `POST`s JSON `{ name, email, subject, message }`, and any 2xx response counts as success. See `submitMessage()` in `src/components/Contact.jsx`.

### Future: Spring Boot contact API

```java
@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "https://your-domain.com")
public class ContactController {
    private final JavaMailSender mailSender;
    public ContactController(JavaMailSender mailSender) { this.mailSender = mailSender; }

    public record ContactRequest(
        @NotBlank @Size(max = 100) String name,
        @Email @NotBlank String email,
        @NotBlank @Size(max = 150) String subject,
        @NotBlank @Size(min = 20, max = 3000) String message) {}

    @PostMapping
    public ResponseEntity<Void> send(@Valid @RequestBody ContactRequest req) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("yogeshpatil2991998@gmail.com");
        mail.setReplyTo(req.email());
        mail.setSubject("[Portfolio] " + req.subject());
        mail.setText(req.message() + "\n\n— " + req.name() + " <" + req.email() + ">");
        mailSender.send(mail);
        return ResponseEntity.accepted().build();
    }
}
```

Add `spring-boot-starter-mail` and `spring-boot-starter-validation`, then configure SMTP in `application.properties`. Use a Gmail App Password stored in environment variables, never in Git. Add rate limiting (for example Bucket4j) and a honeypot field or CAPTCHA before going live. Optionally persist messages in MySQL with JPA. Then set `contact.formEndpoint` to `https://api.your-domain.com/api/contact`.

## Deployment

The site is fully static: a single page, no router, no server config needed.

**Vercel**
1. Push this folder to a GitHub repository.
2. On vercel.com: **Add New → Project**, then import the repo. The framework is auto-detected as **Vite** (build: `npm run build`, output: `dist`).
3. Deploy. Add your custom domain later under **Settings → Domains**.

**Netlify**
1. Push to GitHub. On netlify.com: **Add new site → Import an existing project**.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Or drag and drop the `dist/` folder onto app.netlify.com/drop for a quick manual deploy.

After you pick a domain, update the Open Graph URLs in `index.html` and `site.url` in `portfolio.js`.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: Framer Motion animations, CSS animations, smooth scrolling and the custom cursor are all disabled.
- Keyboard: skip link, visible focus rings, a mobile menu that closes with Escape, and a project dialog with a focus trap that returns focus when closed.
- The custom cursor only appears on precise pointers (mouse) and never hides the native cursor.
- No images are needed above the fold; screenshots are lazy-loaded.
