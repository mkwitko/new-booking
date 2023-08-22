import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'
import SearchComponent from './(sections)/Search/Search'
import '@/config/awsConfig'

export default async function Search() {
  return (
    <Container>
      <Title title="Pesquisa de Disponibilidade" />
      <WhiteBox>
        <SearchComponent />
      </WhiteBox>
    </Container>
  )
}
