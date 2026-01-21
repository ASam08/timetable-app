import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const rotateDegree = '5';
  const rotatePositive = 'rotate-' + rotateDegree;
  const rotateNegative = '-rotate-' + rotateDegree;
  return (
    <div className="bg-stone-200 dark:bg-gray-950 min-h-screen">
      <div className="flex flex-row mx-auto items-center p-6 bg-stone-200 dark:bg-black">
        <main className="flex">
          <h1 className="text-2xl font-semibold tracking-wide text-blue-600 dark:text-blue-400">
            Welcome to the Timetable App!
          </h1>
        </main>
      </div>
      <div className="p-8">
      <div className={`flex flex-col flex-1 ${rotatePositive} w-64 rounded-xl p-8 border-2 justify-self-center text-center border-stone-500 dark:border-gray-700`}>
      <div className={`p-2 text-creamsicle-600 dark:text-cream-sicle-400 ${rotateNegative}`}>
        Sick of forgetting your classes? This app has got you covered!
      </div>
      <div className={`p-2 text-creamsicle-600 dark:text-cream-sicle-400 ${rotateNegative}`}>
        Easily create and manage your class timetable with our intuitive interface.
      </div>
      <div className={`p-2 text-creamsicle-600 dark:text-cream-sicle-400 ${rotateNegative}`}>
        Stay <span className="font-bold text-blue-600 dark:text-blue-400">organised</span> and <span className="font-bold text-blue-600 dark:text-blue-400">never</span> miss a class again!  
      </div>
      </div>
      <div className="justify-center items-center mt-8 text-center text-gray-800 dark:text-gray-200">
      Sign In here
      <p className="p-3">
        <Button className="shadow-lg shadow-blue-500/50 hover:shadow-blue-500/20 bg-blue-600 dark:bg-blue-400 hover:bg-blue-500 hover:dark:bg-blue-300 text-white dark:text-gray-900 font-semibold">
          <Link href="/login">
          Sign In
          </Link>
          </Button></p>
      </div>
      </div>
    </div>
  );
}
