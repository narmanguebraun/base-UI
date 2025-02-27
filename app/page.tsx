import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col justify-between bg-[#161318] px-8 py-24 text-white">
      <h1 className="text-3xl">Base</h1>
      <section className="text-xl leading-10">
        <h2>Design System starter</h2>
        <p>Public template</p>
        <p>
          Next, Tailwind CSS, Class Variance Autority, React Aria, Storybook
        </p>
      </section>
    </main>
  );
}
