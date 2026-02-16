import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="grid grid-cols-1 md:grid-cols-2 h-[50vh] max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-8 space-y-6">
          <div className="inline-block">
            <span className="text-xs font-bold tracking-widest text-blue-600 bg-blue-100 px-4 py-2 rounded-full uppercase">
              ⚡ Best in Class
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            The Best URL Shortener{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              In The Market
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
            We are the most{" "}
            <span className="font-semibold text-gray-900">straightforward</span>{" "}
            and <span className="font-semibold text-gray-900">powerful</span>{" "}
            URL shortener in the world.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Get Started Free
            </button>
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50" />
          <Image
            src="/vector.avif"
            fill
            alt="URL Shortener Illustration"
            className="object-contain p-8 drop-shadow-2xl"
            priority
          />
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </section>
    </main>
  );
}
