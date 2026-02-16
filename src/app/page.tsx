import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-48 h-48 mb-8">
          <Image
            src="/android-chrome-512x512.png"
            alt="Rodney Osodo"
            fill={true}
            className="rounded-full object-cover border-2 border-border"
            priority={true}
          />
        </div>
        <h1 className="text-4xl font-bold mb-6">Rodney Osodo</h1>
        <h2 className="text-1xl mb-2">
          Mechatronics Engineer | Community Builder | Software Engineer
        </h2>
        <div className="max-w-2xl text-muted-foreground">
          <p className="my-6">
            Hey 👋🏾, I'm Rodney. I studied Mechatronics Engineering for 5 years
            and now I write software. I am passionate about building scalable
            distributed systems, building communities (
            <a
              href="https://www.meetup.com/python-nairobi/"
              className="text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Python-Nairobi
            </a>{" "}
            and{" "}
            <a
              href="https://www.meetup.com/roboke/"
              className="text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              RoboKE
            </a>
            ), and building products that make people's lives easier.
          </p>
        </div>
      </div>
    </div>
  );
}
