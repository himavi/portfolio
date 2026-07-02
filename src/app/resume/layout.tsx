/**
 * Isolated layout for the resume page — overrides the dark portfolio body
 * so the resume renders on a clean white background with dark text.
 */
export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-800 [color-scheme:light]">
      {children}
    </div>
  );
}
