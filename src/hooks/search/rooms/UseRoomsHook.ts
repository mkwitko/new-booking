import { useState } from 'react';

export default function UseRoomsHook() {
  //   Rooms
  const [rooms, setRooms] = useState<number>(1);

  const textRoom = rooms + (rooms === 1 ? ' quarto' : ' quartos');

  return {
    rooms,
    setRooms,
    textRoom,
  };
}
