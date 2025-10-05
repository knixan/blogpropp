import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <Image
        src="/images/hero.jpg"
        alt="bakgrundsbild"
        fill
        className="absolute z-0 object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">
          <span className="text-[#f95738]">Welcome to</span>{" "}
          <span className="text-[#f4d35e]">BlogPropp</span>
        </h1>
        <p className="mb-6 text-lg font-semibold text-[#ebebd3] lg:text-xl sm:px-16 xl:px-48">
          This is a simple example of a blog application in Next.js using
          Tailwind CSS, PostgreSQL, Prisma and Better Auth.
        </p>
      </div>
    </div>
  );
}
