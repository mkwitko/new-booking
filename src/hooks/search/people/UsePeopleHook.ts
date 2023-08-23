import { useState } from 'react';

export default function UsePeopleHook() {
  //  People
  const [adult, setAdult] = useState<number>(1);
  const [child, setChild] = useState<number>(0);

  const textAdult = adult + (adult === 1 ? ' adulto' : ' adultos');
  const textChild = child + (child === 1 ? ' criança' : ' crianças');

  return {
    adult,
    setAdult,
    child,
    setChild,
    textAdult,
    textChild,
  };
}
