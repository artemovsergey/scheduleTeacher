// Header.tsx - Минималистичный хедер без текстового названия
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ teacher, onChangeTeacher }: {
  teacher: string,
  onChangeTeacher: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigationItems = [
    { path: "/", label: "Расписание", icon: "📅" },
    { path: "/semester", label: "Семестр", icon: "📆" },
    { path: "/journal", label: "Журнал", icon: "📓" },
    { path: "/create", label: "Добавить", icon: "➕", highlight: true }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Minimal Logo - Only Icon */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium text-slate-500">Учебное расписание</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-2.5 py-1.5 rounded-lg transition-all ${isActive
                  ? 'text-indigo-700 bg-indigo-50 font-medium shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
                  } ${item.highlight ? 'md:bg-indigo-50 md:text-indigo-700' : ''}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs mt-0.5">{item.label}</span>
              </Link>
            );
          })}

          <div className="ml-3 flex items-center space-x-1.5">
            <select
              value={teacher}
              onChange={onChangeTeacher}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="asv">Васильев</option>
              <option value="lsp">Петров</option>
              <option value="eiv">Волкова</option>
            </select>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Меню"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-40"
          onClick={closeMenu}
        >
          <div
            className="bg-white w-4/5 max-w-xs h-full p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="p-1.5 bg-indigo-50 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xl text-slate-800">Меню</div>
                  <div className="text-sm text-slate-500">Навигация</div>
                </div>
              </div>
              <button
                onClick={closeMenu}
                className="text-slate-500 hover:text-slate-700 p-1"
                aria-label="Закрыть меню"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${isActive
                      ? 'text-indigo-700 bg-indigo-50 font-medium'
                      : 'text-slate-700 hover:bg-slate-100'
                      } ${item.highlight ? 'bg-indigo-50 text-indigo-700' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Преподаватель</label>
              <select
                value={teacher}
                onChange={(e) => {
                  onChangeTeacher(e);
                  closeMenu();
                }}
                className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              >
                <option value="asv">А.С. Васильев</option>
                <option value="lsp">Л.С. Петров</option>
                <option value="eiv">Е.И. Волкова</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}