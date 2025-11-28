"use client"

import { Button } from "@/components/Button"

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col justify-between px-8 py-24">
      <h1 className="text-3xl">Base</h1>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button intent="default">Upload</Button>
        <Button intent="error">Upload</Button>
        <Button intent="warning">Upload</Button>
        <Button intent="secondary">Upload</Button>
        <Button intent="tertiary">Upload</Button>
        <Button intent="tertiary" isDisabled>
          Upload
        </Button>
      </div>
      <section className="text-regular leading-8">
        <h2>Design System starter</h2>
        <p>Public template</p>
        <p>
          Next, Tailwind CSS, Class Variance Autority, React Aria, Storybook
        </p>
      </section>
    </main>
  )
}
