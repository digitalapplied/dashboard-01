import Link from "next/link"
import { ArrowRightIcon, BarChart3Icon, CarIcon, ClockIcon, MapPinIcon, ShieldCheckIcon, TruckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <TruckIcon className="h-6 w-6" />
            <span className="text-xl font-bold">FleetMaster</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
              Manage Your Fleet with Confidence
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl mb-8">
              Streamline operations, reduce costs, and improve efficiency with our comprehensive fleet management
              solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Get Started
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Book a Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Powerful Fleet Management Features</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Everything you need to manage your fleet efficiently in one platform.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPinIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time Tracking</CardTitle>
                  <CardDescription>
                    Monitor your entire fleet in real-time with GPS tracking and route optimization.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Know where your vehicles are at all times and optimize routes for maximum efficiency and fuel
                    savings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    Comprehensive analytics and reporting to optimize your fleet operations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Gain insights into fuel consumption, driver behavior, maintenance costs, and more with detailed
                    reports.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Maintenance Scheduling</CardTitle>
                  <CardDescription>Automate maintenance schedules and reduce vehicle downtime.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Set up automated maintenance reminders based on mileage, time, or engine hours to prevent
                    breakdowns.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Driver Management</CardTitle>
                  <CardDescription>Monitor driver performance and ensure compliance with regulations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track driver hours, behavior, and performance to improve safety and reduce liability risks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShieldCheckIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Compliance Management</CardTitle>
                  <CardDescription>
                    Stay compliant with industry regulations and documentation requirements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage licenses, permits, and certifications with automated reminders for renewals and inspections.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TruckIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Fleet Optimization</CardTitle>
                  <CardDescription>
                    Optimize your fleet size and composition based on data-driven insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Make informed decisions about vehicle acquisition, replacement, and disposal to reduce total cost of
                    ownership.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Ready to Transform Your Fleet Management?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground mb-8">
              Join thousands of fleet managers who have improved efficiency and reduced costs with FleetMaster.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Access Dashboard
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TruckIcon className="h-5 w-5" />
                <span className="text-lg font-bold">FleetMaster</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive fleet management solutions for businesses of all sizes.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2023 FleetMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

