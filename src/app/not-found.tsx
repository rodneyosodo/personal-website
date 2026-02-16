import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 px-4 py-16 text-center">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground uppercase">Error 404</p>
        <h1 className="text-8xl sm:text-9xl font-bold tracking-tighter">404</h1>
      </div>
      <div className="space-y-1 max-w-sm">
        <p className="font-medium">Page not found</p>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Button>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
