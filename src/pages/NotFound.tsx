import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-slate-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}