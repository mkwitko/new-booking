import Container from '@/components/coreComponents/containers/Container';
import InputContainer from '@/components/coreComponents/containers/InputContainer';
import WhiteBox from '@/components/coreComponents/containers/WhiteBox';
import Button from '@/components/interactiveComponents/Button';
import { Combobox } from '@/components/interactiveComponents/ComboBox';
import { DatePicker } from '@/components/interactiveComponents/DatePicker';
import Title from '@/components/text/Title';

export default function Search() {
  return (
    <Container>
      <Title title="Pesquisa de Disponibilidade" />
      <WhiteBox>
        <div className="flex w-full gap-4">
          <InputContainer label="Ponto de venda">
            <Combobox />
          </InputContainer>

          <InputContainer label="Destino">
            <Combobox />
          </InputContainer>

          <InputContainer label="Data de Entrada e Saída">
            <DatePicker />
          </InputContainer>

          <InputContainer label="Pessoas e Quartos">
            <Combobox />
          </InputContainer>
        </div>

        <div className="flex w-full items-center justify-between">
          <div>
            <Button label="Mapa" />
          </div>

          <div className="flex gap-4 lg:w-1/4">
            <Button
              label="Limpar Filtro"
              textClass="text-textDisabled"
              color="light"
              mergeClass="px-0"
            />
            <Button
              label="Buscar"
              mergeClass="px-0"
            />
          </div>
        </div>
      </WhiteBox>
    </Container>
  );
}
