import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  BookOpen,
  Plus,
  Menu,
  X,
} from "lucide-react";

type Props = {
  teacher: string;
  onChangeTeacher: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Header({ teacher, onChangeTeacher }: Props) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigationItems = [
    {
      path: "/",
      label: "Расписание",
      icon: Calendar,
    },
    {
      path: "/journal",
      label: "Журнал",
      icon: BookOpen,
    },
    {
      path: "/create",
      label: "Добавить",
      icon: Plus,
      highlight: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="p-1.5 bg-indigo-50 rounded-lg">
          <Calendar className="h-6 w-6 text-indigo-600" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center px-2.5 py-1.5 rounded-lg transition-all
                  ${isActive
                    ? "text-indigo-700 bg-indigo-50 font-medium shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                  }
                  ${item.highlight ? "md:bg-indigo-50 md:text-indigo-700" : ""}
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-0.5">{item.label}</span>
              </Link>
            );
          })}

          <div className="ml-3">
            <select
              value={teacher}
              onChange={onChangeTeacher}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="asv">Артемов С. В.</option>
              <option value="lsp">Лукьянова С. П.</option>
              <option value="eiv">Еремина И. В.</option>
            </select>
          </div>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 focus:ring-2 focus:ring-indigo-500"
          aria-label="Меню"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={closeMenu}
        >
          <div
            className="bg-white w-4/5 max-w-xs h-full p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl
                      ${isActive
                        ? "text-indigo-700 bg-indigo-50 font-medium"
                        : "text-slate-700 hover:bg-slate-100"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Преподаватель
              </label>
              <select
                value={teacher}
                onChange={(e) => {
                  onChangeTeacher(e);
                  closeMenu();
                }}
                className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              >
                <option value="asv">Артемов С. В.</option>
                <option value="lsp">Лукьянова С. П.</option>
                <option value="eiv">Еремина И. В.</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
