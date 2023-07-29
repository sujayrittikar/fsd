import Link from 'next/link';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="py-4 bg-blue-500 text-white">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/tic-tac-toe">
              Tic Tac Toe
            </Link>
          </li>
          <li>
            <Link href="/product-table">
              Product Table
            </Link>
          </li>
        </ul>
      </nav>
      <p>This is just a demo to display some pages in the main page of a next.js application.</p>
    </div>
  );
};

export default App;
