import { Logo } from "../Logo";

type AdminHeaderProps = {
  name: string;
};

export const AdminHeader = ({ name }: AdminHeaderProps) => {
  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/admin" className="text-white text-xl">
            <span className="sr-only">{name}</span>
            Admin Panel
          </a>
        </div>
      </nav>
    </header>
  )
}
