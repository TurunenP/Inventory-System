// src/components/LabAStorage.jsx
import { Link } from 'react-router-dom';
import Layout from './Layout';

const LabAStorage = () => {
  return (
    <div className="w-[90%] mx-auto my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Lab A Storage</h1>

      {/* Cabinet A */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Cabinet A</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            '3D Printing',
            'Control System',
            'Robotics & Peripherals',
            'Pneumatics1',
            'Grippers2',
            'Electronics',
          ].map((item) => (
            <Link
              key={item}
              to="/student/labs/LabA/door"
              className="bg-blue-300 text-gray-900 py-6 px-8 rounded-lg shadow-md text-center hover:bg-blue-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Cabinet B */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Cabinet B</h2>
        <div className="grid grid-cols-2 gap-4">
          {['Power Sources', 'Cameras', 'Staff1', 'Staff2'].map((item) => (
            <Link
              key={item}
              to="/student/labs/LabA/door"
              className="bg-green-300 text-gray-900 py-6 px-8 rounded-lg shadow-md text-center hover:bg-green-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Shelves */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Shelves</h2>
        <div className="grid grid-cols-2 gap-4">
          {['Shelf1', 'Shelf2'].map((item) => (
            <Link
              key={item}
              to="/student/labs/labA/shelf"
              className="bg-purple-300 text-gray-900 py-6 px-8 rounded-lg shadow-md text-center hover:bg-purple-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Components */}
      <div className="flex justify-around gap-10 w-full">
        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Trolley</h2>
          <Link
            to="/student/labs/labA/trolley"
            className="bg-yellow-300 text-gray-900 py-6 px-8 rounded-lg shadow-md text-center hover:bg-yellow-400 transition block w-full"
          >
            Trolley
          </Link>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Components</h2>
          <Link
            to="/student/labs/labA/components"
            className="bg-yellow-300 text-gray-900 py-6 px-8 rounded-lg shadow-md text-center hover:bg-yellow-400 transition block w-full"
          >
            Components
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LabAStorage;
