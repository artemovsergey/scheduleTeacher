// Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-3">
      <div className="container mx-auto px-4 text-center text-xs text-slate-500">
        <p> Колледж связи © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}