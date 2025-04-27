import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import logo from '../assets/logo.png';

const navigation = [
  { name: "Productos", href: "/" },
  { name: "Formulario de Pago", href: "/payment-form" },
  { name: "Resultado del Pago", href: "/payment-result" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Disclosure as="nav" className="bg-primary text-primary-text p-6 shadow-md fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-primary-text">Mi Tienda</span>
            </a>
            <div className="hidden sm:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-primary-hover text-primary-text hover:text-primary-text"
                        : "text-primary-text hover:bg-primary-hover hover:text-primary-text",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-primary-text hover:bg-primary-hover rounded-md " />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-text text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="-mr-2 flex sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary-text hover:bg-primary-hover bg-primary-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-primary-hover text-primary-text"
                      : "text-primary-text hover:bg-primary-hover hover:text-primary-text",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
