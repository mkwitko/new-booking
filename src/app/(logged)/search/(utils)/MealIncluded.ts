interface MealsProps {
  code: string
  name: string
  iconPath: string
}

const meals: MealsProps[] = [
  {
    code: 'SP',
    name: 'SEM PENSÃO',
    iconPath: '/mealIcons/noMealIncluded.svg',
  },
  {
    code: 'AI',
    name: 'ALL INCLUSIVE',
    iconPath: '/mealIcons/fullMealIncluded.svg',
  },
  {
    code: 'CM',
    name: 'CAFÉ DA MANHÃ',
    iconPath: '/mealIcons/breakfast.svg',
  },
  {
    code: 'MP',
    name: 'MEIA PENSÃO',
    iconPath: '/mealIcons/halfMealIncluded.svg',
  },
  {
    code: 'MA',
    name: 'MEIA PENSÃO (ALMOCO)',
    iconPath: '/mealIcons/halfMealIncluded.svg',
  },
  {
    code: 'MJ',
    name: 'MEIA PENSÃO (JANTAR)',
    iconPath: '/mealIcons/halfMealIncluded.svg',
  },
  {
    code: 'PC',
    name: 'PENSÃO COMPLETA',
    iconPath: '/mealIcons/fullMealIncluded.svg',
  },
]

export function getMealIncludedValue(code: string): MealsProps {
  return meals.find((e: MealsProps) => {
    return e.code === code
  }) as MealsProps
}
