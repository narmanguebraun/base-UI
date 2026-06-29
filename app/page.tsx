import { Button } from "@/components/Button"
import { TextField } from "@/components/TextField"

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col justify-between px-8 py-24">
      <h1 className="text-3xl">Base</h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button intent="default">Default</Button>
          <Button intent="primary">Primary</Button>
          <Button intent="destructive">Destructive</Button>
          <Button intent="warning">Warning</Button>
          <Button intent="ghost">Ghost</Button>
          <Button intent="default" isDisabled>
            Disabled
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
          <TextField label="Default" placeholder="you@example.com" />
          <TextField
            label="With description"
            placeholder="you@example.com"
            description="We'll never share your email."
          />
          <TextField
            label="Invalid"
            placeholder="you@example.com"
            isInvalid
            errorMessage="Please enter a valid email address."
          />
          <TextField
            label="Disabled"
            placeholder="you@example.com"
            isDisabled
          />
        </div>
      </div>
      <section className="text-regular leading-8">
        <h2>Design System starter</h2>
        <p>Public template</p>
        <p>
          Next, Tailwind CSS, Class Variance Authority, React Aria, Storybook
        </p>
      </section>
    </main>
  )
}
