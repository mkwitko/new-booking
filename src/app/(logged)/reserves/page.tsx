import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'
import SearchReservesComponent from './(sections)/Search/SearchReserves'

export default function Reserves() {
  return (
    <Container>
      <Title title="Busque por reservas" />
      <WhiteBox>
        {/* <SearchReservesComponent /> */}
      </WhiteBox>
    </Container>
  )
}
