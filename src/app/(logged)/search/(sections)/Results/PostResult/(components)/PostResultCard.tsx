/* eslint-disable @next/next/no-img-element */
import { Hotels } from '@/classes/availability/DTO/AvailabilityDTO';

export default function PostResultCard({ hotel }: { hotel: Hotels }) {
  return (
    <div className="flex flex-col bg-white p-4 rounded-b2b border border-borderColor/20 h-[35rem] justify-around">
      {/* TODO trocar para Image do next */}
      <img
        className="rounded-b2b aspect-[2.144/1] object-cover"
        src={
          hotel?.exteriorViewImageURL
            ? `${process.env.NEXT_PUBLIC_HOTEL_IMAGES_URL}${hotel?.exteriorViewImageURL}`
            : '/public/icons/withoutResult.svg'
        }
        alt={hotel.name.toLowerCase()}
      />
    </div>
  );
}
