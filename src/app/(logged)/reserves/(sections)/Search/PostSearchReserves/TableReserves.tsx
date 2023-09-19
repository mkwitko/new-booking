"use client";

import WhiteBox from "@/components/coreComponents/containers/WhiteBox";
import { ReservesContext } from "@/context/ReservesContext";
import { labelSystemIdentity } from "@/utils/integratedSystem";
import { Block, BorderColor, Circle } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { format, isAfter } from "date-fns";
import { useContext, useState } from "react";
import { B2BDatatable } from "react-components";
import { Input } from "./(components)/input";
import { ModalB2b } from "./(components)/Modal";
import { useForm } from "react-hook-form";
import { LoggedContext } from "@/context/LoggedContext";
import { toast } from "react-toastify";
import { Textarea } from "@/components/formComponents";

export default function TableReserves() {
  const { reservesHook } = useContext(ReservesContext);
  const { booking } = useContext(LoggedContext)
  const [bookingData, setBookingData] = useState<any>();
  const [openCancelEditModal, setOpenCancelEditModal] = useState(false);
  const [, setRowsSelected] = useState([]);

  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      observation: "",
      status: "CONFIRMED",
      dateType: "ISSUANCE",
      requestType: "",
    },
  });

  async function prepareRequestCancelEditBooking(values: any) {
    if (!bookingData) {
      return;
    }

    const payload = {
      reservationNumber: bookingData.channelReservationNumber,
      observation: values.observation,
      type: values.requestType,
    };

    try {
      await booking.editBookingRequest(payload);
      setOpenCancelEditModal(false)
      toast.success('Solicitação enviada com sucesso!')
    } catch(error) {
      toast.error('Erro ao enviar solicitação')
    }
  }

  const handleCloseCancelEditModal = () => {
    setValue("requestType", "");
    setOpenCancelEditModal(false);
  };

  if (!reservesHook.reserves || reservesHook.reserves.length === 0) {
    return null;
  }

  return (
    <>
      {reservesHook.reserves && reservesHook.reserves.length > 0 && (
        <div className="my-8 flex flex-col items-start gap-4">
          <div className="flex items-center">
            <p className="font-[600] text-primary md:text-large">
              Lista de Reservas
            </p>
          </div>

          <WhiteBox className="w-full max-w-[1200px] mx-auto overflow-x-auto overflow-y-hidden">
            <B2BDatatable
              showOptions
              getRowsSelected={(selected: any) => setRowsSelected(selected)}
              detailBtn
              showExport={false}
              hasCheckbox={false}
              tableContainerSx={{ maxHeight: 440, maxWidth: 1150, width: '100%' }}
              labels={{
                export: "Exportar",
                filter: "Filtrar",
                inputLabelSearch: "Pesquisar...",
                operator: "Operador",
                operatorSelect: "Selecione o operador",
                paginationMoreThan: "Maior que",
                paginationOf: "De",
                paginationRowsPerPage: "Linhas por página",
                pin: "Pin",
                unPin: "UnPin",
                pinnedRowRemoveFilter: "Remover filtro",
                showHideColumn: "Colunas",
                value: "Valores",
              }}
              columns={[
                {
                  accessor: "channelReservationNumber",
                  Header: "Reservas",
                },
                {
                  accessor: "cancellationLimit",
                  Header: "Prazo para cancelamento",
                  Cell: ({ value }: any) =>
                    format(new Date(value), "dd/MM/yyyy HH:mm"),
                },
                {
                  accessor: "status",
                  Header: "Status",
                  Cell: ({ value }: any) => {
                    let color = "";
                    let title = "";
                    switch (value) {
                      case "CONFIRMED":
                        color = "#2BD971";
                        title = "Confirmado";
                        break;
                      case "CANCELED":
                        color = "#F23030";
                        title = "Cancelado";
                        break;
                      case "concluded":
                        color = "#0BC1D9";
                        title = "Concluído";
                        break;
                      case "MODIFIED":
                        color = "#FFBF00";
                        title = "Modificado";
                        break;
                      default:
                        color = "#989D9E";
                        title = "Pendente";
                        break;
                    }

                    return (
                      <Tooltip title={title}>
                        <Circle htmlColor={color} sx={{ width: 15 }} />
                      </Tooltip>
                    );
                  },
                },
                {
                  accessor: "created",
                  Header: "Emissão",
                  Cell: ({ value }: any) =>
                    format(new Date(value), "dd/MM/yyyy HH:mm"),
                },
                {
                  accessor: "customer.name",
                  Header: "Cliente",
                },
                {
                  accessor: "property.address.location.cityName",
                  Header: "Cidade",
                },
                {
                  accessor: "systemCode",
                  Header: "Sistema",
                  Cell: ({ value }: any) => labelSystemIdentity(value),
                },
                {
                  accessor: "property.name",
                  Header: "Hotel",
                },
                {
                  accessor: "roomType.classification",
                  Header: "Quarto",
                },
                {
                  accessor: "guests[0].name",
                  Header: "Hóspede",
                },
                {
                  accessor: "channel",
                  Header: "Channel",
                },
                {
                  accessor: "startDate",
                  Header: "Check In",
                  Cell: ({ value }: any) =>
                    format(new Date(value), "dd/MM/yyyy"),
                },
                {
                  accessor: "endDate",
                  Header: "Check Out",
                  Cell: ({ value }: any) =>
                    format(new Date(value), "dd/MM/yyyy"),
                },
              ]}
              data={reservesHook.reserves}
              renderRowActions={({ original }) => {
                console.log("original", original);
                original.isDeadline = isAfter(
                  new Date(original.cancellationLimit),
                  new Date(),
                );

                return (
                  <>
                    {original.status !== "CANCELED" && (
                      <>
                        <Tooltip
                          title={
                            original.isDeadline
                              ? "Cancelar Reserva"
                              : "Solicitar Cancelamento"
                          }
                        >
                          <IconButton
                            size="small"
                            onClick={() => {
                              setBookingData(original);
                              setValue("requestType", "CANCEL");
                              setOpenCancelEditModal(true);
                            }}
                          >
                            <Block />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={
                            original.isDeadline
                              ? "Editar Reserva"
                              : "Solicitar Edição"
                          }
                        >
                          <IconButton
                            size="small"
                            onClick={() => {
                              setBookingData(original);
                              setValue("requestType", "UPDATE");
                              setOpenCancelEditModal(true);
                            }}
                          >
                            <BorderColor />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </>
                );
              }}
            />
          </WhiteBox>
        </div>
      )}

      <ModalB2b.Container
        anchor="center"
        height="24.5rem"
        width="40rem"
        open={openCancelEditModal}
        handleClose={handleCloseCancelEditModal}
      >
        <ModalB2b.Content>
          <Box
            component="form"
            sx={{ padding: 3 }}
            onSubmit={handleSubmit(prepareRequestCancelEditBooking)}
          >
            <h4 className="font-medium text-2xl uppercase text-primary-500">
              SOLICITAR EDIÇÃO OU CANCELAMENTO
            </h4>

            <FormControl fullWidth>
              <span className="text-base text-textSecondary">
                Solicitação
              </span>
              <Input  
                type="radio"
                control={control}
                name="requestType"
                required
                radioValues={[
                  {
                    label: "Edição",
                    value: "UPDATE",
                  },
                  {
                    label: "Cancelamento",
                    value: "CANCEL",
                  },
                ]}
              />
            </FormControl>

            <Textarea 
              register={register('observation')}
              placeholder="Observações"
              className="mt-4"
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                sx={{ color: "#007380" }}
                onClick={handleCloseCancelEditModal}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                sx={{
                  textTransform: "uppercase",
                  color: "#fff",
                  bgcolor: "#273472",
                  width: 203,
                  height: 50,
                  "&:hover": {
                    bgcolor: "#1c2347",
                  },
                }}
              >
                Solicitar
              </Button>
            </Box>
          </Box>
        </ModalB2b.Content>
      </ModalB2b.Container>
    </>
  );
}
