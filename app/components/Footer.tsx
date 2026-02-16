export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>

        {/* Center Links */}
        <ul className="flex gap-6 text-sm">
          <li className="hover:text-white cursor-pointer">Privacy</li>
          <li className="hover:text-white cursor-pointer">Terms</li>
          <li className="hover:text-white cursor-pointer">Contact</li>
        </ul>

        {/* Right */}
        <p className="text-sm">
          Made with ❤️ in India
        </p>

      </div>
    </footer>
  );
}
