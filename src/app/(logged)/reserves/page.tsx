import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'
import SearchReservesComponent from './(sections)/Search/SearchReserves'
import { ReservesContextProvider } from '@/context/ReservesContext'

export default function Reserves() {
  return (
    <Container>
      <Title title="Busque por reservas" />
      <WhiteBox>
        <ReservesContextProvider>
          <SearchReservesComponent />
        </ReservesContextProvider>
      </WhiteBox>
    </Container>
  )
}
