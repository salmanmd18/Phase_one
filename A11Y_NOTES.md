Accessibility Audit (WCAG 2.2 AA)

Summary of fixes
- Color contrast: Raised small muted text from slate-500 to slate-600 in key spots (header tagline, capacity lines) to meet AA for small text.
- Focus management: Maintained default logical DOM order; ensured disabled demo link in BookingWidget is not focusable (tabIndex=-1) and marked aria-disabled.
- Date picker semantics: Replaced improper role="grid" with role="group" for the lightweight picker; added localized aria-label per date.
- Live regions: Checkout uses an aria-live polite region to announce errors and a toast for success; inline field errors use role=alert.
- Form semantics: Added autocomplete attributes for name, email, and tel; inputs retain explicit label associations via for/id.
- Fonts & motion: Preload fonts with font-display: swap; reduced-motion respected in globals; focus-visible ring provided.

Outstanding considerations
- For full grid semantics and arrow-key navigation in the date picker, consider roles row/gridcell and keyboard handlers; current design keeps it lightweight and accessible.
- Consider adding skip-to-content link for long pages.

Manual checklist
- Labels associated: Yes (Checkout form, filter controls)
- Keyboard nav: Yes (all controls focusable; disabled Reserve not focusable)
- Visible focus: Yes (custom focus-visible)
- Direction: dir toggles RTL/LTR; Arabic leading adjusted
- Contrast: Buttons and key text pass AA; muted small text bumped to slate-600
- Live feedback: aria-live polite used; inline alerts for fields

