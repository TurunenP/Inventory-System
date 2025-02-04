// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  // Dynamically generate breadcrumb links from the URL path
  const breadcrumbs = location.pathname
    .split('/')
    .filter((path) => path)
    .map((path, index, array) => {
      const linkPath = '/' + array.slice(0, index + 1).join('/');
      const isLast = index === array.length - 1;

      return isLast ? (
        <span key={linkPath} className="text-gray-600 capitalize">
          {path.replace(/lab/g, 'Lab ').replace(/cabinet/g, 'Cabinet ')}
        </span>
      ) : (
        <Link
          key={linkPath}
          to={linkPath}
          className="text-blue-500 hover:underline capitalize"
        >
          {path.replace(/lab/g, 'Lab ').replace(/cabinet/g, 'Cabinet ')}
        </Link>
      );
    });

  return (
    <header className="bg-gray-100 shadow-md py-4 px-6 flex justify-between items-center pb-8 shadow-blue-700">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Lab Management</h1>
        <nav className="mt-2 text-sm flex space-x-2">
          <Link to="/Staff" className="text-blue-500 hover:underline">
            Staff
          </Link>
          <span>/</span>
          {breadcrumbs}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
