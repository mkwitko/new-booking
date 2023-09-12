import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'
import SearchReservesComponent from './(sections)/Search/SearchReserves'
import { ReservesContextProvider } from '@/context/ReservesContext'
import TableReserves from './(sections)/Search/PostSearchReserves/TableReserves'

export default function Reserves() {
  return (
    <Container>
      <Title title="Busque por reservas" />
      <ReservesContextProvider>
        <WhiteBox>
          <SearchReservesComponent />
        </WhiteBox>
        <TableReserves />
      </ReservesContextProvider>
    </Container>
  )
}
