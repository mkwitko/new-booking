import Image from "next/image";
import Link from "next/link";
import BackgroundImage from "@/assets/images/teste.jpg";
import { ChevronLeft } from "lucide-react";
import { StarRating } from "../../search/[id]/(components)/StarRating";

export default function Page() {
  return (
    <>
      <figure className="flex w-full items-center justify-center bg-textPrimary backdrop-blur-sm">
        <Image
          src={BackgroundImage}
          alt="Imagem do Hotel"
          width={1000}
          height={500}
          className="h-[370px] w-full max-w-[964px] object-cover"
        />
      </figure>

      <section className="mx-auto flex w-full max-w-[964px] flex-col items-start py-10">
        <div className="flex items-center justify-start gap-2">
          <Link className="flex w-8 items-center justify-center" href="/">
            <ChevronLeft className="text-primary" size={32} />
          </Link>

          <span className="block text-2xl font-semibold uppercase text-primary">
            HOTEL DISNEY
          </span>

          <StarRating className="ml-2" />
        </div>

        <div className="ml-10 flex items-center justify-start gap-2">
          <span className="text-xs text-primary">https://localhost:300</span>
          <span className="text-xs font-bold text-textSecondary">
            App Sistemas
          </span>
        </div>

        <div className="space-y-4 pb-6 pt-2"></div>
      </section>
    </>
  );
}
