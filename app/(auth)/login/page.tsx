import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAction } from './_actions/login';

export const metadata = {
  title: 'Log in - RentHub',
  description: 'Log in to your RentHub account',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
              Log in
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access your rental properties and bookings
            </p>
          </div>

          <form className="space-y-6" action={loginAction}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary h-11"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors"
            >
              Log in
            </Button>
          </form>

          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  );
}