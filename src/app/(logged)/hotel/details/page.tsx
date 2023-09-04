import Image from "next/image";
import Link from "next/link";
import BackgroundImage from '@/assets/images/teste.jpg'
import { ChevronLeft } from "lucide-react";
import { StarRating } from "../../search/[id]/(components)/StarRating";

export default function Page() {
  return (
    <>
      <figure className="w-full flex items-center justify-center bg-textPrimary backdrop-blur-sm">
        <Image
        src={BackgroundImage}
        alt=""
        width={1000}
        height={500}
        className="w-full h-[370px] object-cover max-w-[964px]"
        />
      </figure>

      <section className="flex flex-col items-start w-full max-w-[964px] mx-auto py-10">
        <div className="flex items-center justify-start gap-2">
          <Link className="flex items-center justify-center w-8" href="/">
            <ChevronLeft className="text-primary" size={32} />
          </Link>

          <span className="text-primary font-semibold text-2xl uppercase block">HOTEL DISNEY</span>

          <StarRating className="ml-2"/>
        </div>

        <div className="flex items-center justify-start gap-2 ml-10">
          <span className="text-xs text-primary">https://localhost:300</span>
          <span className="text-xs font-bold text-textSecondary">App Sistemas</span>
        </div>

        <div className="pt-2 pb-6 space-y-4">

        </div>
      
      </section>
    </>
  )
}