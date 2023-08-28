import LoginForm from './(components)/Form'

export default function Home() {
  return (
    <>
      <div
        className="max-width-default flex flex-col-reverse items-center justify-center gap-[2rem]
        px-4 lg:flex-row lg:items-start lg:gap-[6.25rem]"
      >
        <div className="flex w-full items-center justify-center md:w-[30rem] lg:w-[23rem]">
          <LoginForm />
        </div>

        <div
          className="flex flex-1 flex-col items-center gap-2 text-center text-3xl
          text-white md:text-5xl
          lg:mt-8
        lg:items-start lg:gap-4 lg:text-start lg:text-6xl"
        >
          <span className="font-light text-white">Bem vindo a</span>
          <span className="font-bold text-white">
            Plataforma de Serviços B2B
          </span>
        </div>
      </div>
    </>
  )
}
