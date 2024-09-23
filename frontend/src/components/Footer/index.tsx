export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto py-4">
      <p className="text-center text-sm text-gray-600">
        Copyright © <a href="#" className="text-blue-500 hover:underline">Roteirus</a> {currentYear}.
      </p>
    </div>
  );
};