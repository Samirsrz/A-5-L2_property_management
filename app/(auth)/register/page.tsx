import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { registerAction } from './_actions.ts/register';
// import { registerAction } from './_actions/register';

export const metadata = {
  title: 'Create account - RentHub',
  description: 'Create your RentHub account to start listing or booking rental properties',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
              Create account
            </h1>
            <p className="text-muted-foreground text-sm">
              Join RentHub to list properties or find your next rental
            </p>
          </div>

          <form className="space-y-6" action={registerAction}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary h-11"
                required
              />
            </div>

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

            <div className="space-y-3">
              <Label className="text-foreground font-medium">
                I&apos;m signing up as
              </Label>
              <RadioGroup name="role" required>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors cursor-pointer">
                  <RadioGroupItem value="TENANT" id="tenant" className="border-border text-primary" />
                  <Label htmlFor="tenant" className="flex-1 cursor-pointer mb-0">
                    <span className="font-medium text-foreground">Tenant</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Looking to rent a property</p>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors cursor-pointer">
                  <RadioGroupItem value="LANDLORD" id="landlord" className="border-border text-primary" />
                  <Label htmlFor="landlord" className="flex-1 cursor-pointer mb-0">
                    <span className="font-medium text-foreground">Landlord</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Want to list your properties</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors mt-8"
            >
              Create account
            </Button>
          </form>

          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  );
}