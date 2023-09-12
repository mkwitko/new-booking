/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function RoomsAvail({ rooms, setRooms }: any) {
  return (
    <div>
      <label className="block mb-2 font-medium text-xs lg:text-sm">Quartos</label>
      <input
        className="w-full lg:text-sm"
        type="number"
        value={rooms}
        onChange={(event) => setRooms(Number(event.target.value))}
        step="1"
        min="1"
        max="4"
      />
  </div>
  );
}
