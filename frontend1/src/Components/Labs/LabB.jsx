// src/components/LabBStorage.jsx
import { Link } from 'react-router-dom';
import Layout from './Layout';

const LabBStorage = () => {
  return (
    <div className="w-[90%] mx-auto my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lab B Storage</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          'Work Shelf',
          'Exercise Project Shelf',
          'Project Shelf 1',
          'Project Shelf 2',
          'Area 3D Printing',
        ].map((item) => (
          <Link
            key={item}
            to="/Student/labs/labB/bars"
            className="bg-red-300 text-gray-900 py-6 px-8 rounded-lg shadow-md text-center hover:bg-red-400 transition"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LabBStorage;
