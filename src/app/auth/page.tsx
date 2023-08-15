import LoginForm from './(components)/Form';

export default function Home() {
  return (
    <>
      <div
        className="flex flex-col-reverse items-center justify-center px-4 gap-[2rem]
        max-width-default lg:gap-[6.25rem] lg:flex-row lg:items-start"
      >
        <div className="flex items-center justify-center w-full md:w-[30rem] lg:w-[23rem]">
          <LoginForm />
        </div>

        <div
          className="flex flex-1 flex-col text-white lg:mt-8 items-center text-center
          text-3xl gap-2
          md:text-5xl
        lg:items-start lg:text-start lg:text-6xl lg:gap-4"
        >
          <span className="font-light text-white">Bem vindo a</span>
          <span className="font-bold text-white">
            Plataforma de Serviços B2B
          </span>
        </div>
      </div>
    </>
  );
}
