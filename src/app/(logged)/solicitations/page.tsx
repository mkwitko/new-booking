import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'
import SearchSolicitationsComponent from './Search/SearchSolicitations'
import { SolicitationsContextProvider } from '@/context/SolicitationsContext'

export default function Solicitations() {
  return (
    <Container>
      <Title title="Solicitações" />
      <WhiteBox>
        <SolicitationsContextProvider>
          <SearchSolicitationsComponent />
        </SolicitationsContextProvider>
      </WhiteBox>
    </Container>
  )
}
