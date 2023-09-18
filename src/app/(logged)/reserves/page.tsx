"use client";

import Container from "@/components/coreComponents/containers/Container";
import WhiteBox from "@/components/coreComponents/containers/WhiteBox";
import Title from "@/components/text/Title";
import SearchReservesComponent from "./(sections)/Search/SearchReserves";
import { ReservesContextProvider } from "@/context/ReservesContext";
import { DataTable } from "@/components/coreComponents/DataTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function Reserves() {
  const data = [
    {
      status: true,
      "Tipo de Quarto": "Luxo",
      "QTD Quartos": 1,
      Entrada: "01/01/2021",
      Saída: "02/01/2021",
      "Prazo para Cancelamento": "01/01/2021",
      Emissão: "01/01/2021",
      Cliente: "João",
      Cidade: "São Paulo",
      Sistema: "Sistema",
      Hotel: "Hotel",
      Quarto: "Quarto",
      Hospede: "Hospede",
      Channel: "Channel",
    },
  ];
  const headers = [
    {
      accessorKey: "status",
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: any) => {
        console.log(row);
        return (
          <div
            className={`mx-auto h-3 w-3 rounded-full ${
              row.getValue("status") === true ? "bg-green-500" : "bg-red-500"
            }`}
          />
        );
      },
    },
    {
      accessorKey: "Tipo de Quarto",
      header: "Tipo de Quarto",
    },
    {
      accessorKey: "QTD Quartos",
      header: "QTD Quartos",
    },
    {
      accessorKey: "Entrada",
      header: "Entrada",
    },
    {
      accessorKey: "Saída",
      header: "Saída",
    },
    {
      accessorKey: "Prazo para Cancelamento",
      header: "Prazo para Cancelamento",
    },
    {
      accessorKey: "Emissão",
      header: "Emissão",
    },
    {
      accessorKey: "Cliente",
      header: "Cliente",
    },
    {
      accessorKey: "Cidade",
      header: "Cidade",
    },
    {
      accessorKey: "Sistema",
      header: "Sistema",
    },
    {
      accessorKey: "Hotel",
      header: "Hotel",
    },
    {
      accessorKey: "Quarto",
      header: "Quarto",
    },
    {
      accessorKey: "Hospede",
      header: "Hospede",
    },
    {
      accessorKey: "Channel",
      header: "Channel",
    },
  ];
  return (
    <Container>
      <Title title="Busque por reservas" />
      <div className="flex w-full flex-col gap-12">
        <WhiteBox>
          <ReservesContextProvider>
            <SearchReservesComponent />
          </ReservesContextProvider>
        </WhiteBox>

        <WhiteBox classes="overflow-x-auto">
          <DataTable data={data} columns={headers} />
        </WhiteBox>
      </div>
    </Container>
  );
}
