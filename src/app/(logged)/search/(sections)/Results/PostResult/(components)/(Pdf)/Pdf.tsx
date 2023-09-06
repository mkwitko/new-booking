import { BiSolidDownload } from "react-icons/bi";
import { usePdfForm } from "./usePdfForm";

import * as FormComponents from "@/components/formComponents";
import B2BButton from "@/components/interactiveComponents/Button";
import { AiOutlineMail } from "react-icons/ai";
import { useContext, useState } from "react";
import { SearchContext } from "@/context/SearchContext";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";

export default function Pdf({
  setOpenPdf,
}: {
  setOpenPdf: (bool: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, errors, handleSubmit, submit } = usePdfForm({
    setOpenPdf,
    setIsLoading,
  });

  const {
    dateHook,
    roomsHook,
    peopleHook,
    cityHook,
    salePointHook,
    quotationHook,
  } = useContext(SearchContext);

  const pdfData = {
    checkIn: dateHook.checkIn,
    checkOut: dateHook.checkOut,
    room: roomsHook.rooms,
    adult: peopleHook.adult,
    cityName: cityHook.findCityById(cityHook.city).cityName,
    salePoint: salePointHook.findSalePointById(salePointHook.salePoint).name,
    rooms: quotationHook.quotation,
  };

  return (
    <BlobProvider document={<PdfDocument data={pdfData} />}>
      {({ blob }) => {
        return (
          <form
            onSubmit={handleSubmit(async (values) => {
              await submit(values, blob);
            })}
            className="relative flex w-full flex-col justify-start"
          >
            <div className="absolute left-0 right-0 top-0 flex h-[50px] items-center justify-start gap-2">
              <AiOutlineMail size={24} className="text-primary" />
              <span className="text-lg font-semibold uppercase text-primary">
                Enviar
              </span>
            </div>

            <div className="mt-[calc(50px+1.5rem)] flex w-full flex-col ">
              <PDFDownloadLink
                document={<PdfDocument data={pdfData} />}
                fileName="cotação.pdf"
                className="ml-auto cursor-pointer pb-2 text-xs font-bold uppercase text-primary"
              >
                Download Pdf
              </PDFDownloadLink>
              <div className="flex max-h-[25rem] flex-col gap-2 overflow-y-auto">
                <div className="flex flex-col">
                  <p>E-mails separado por vírgula</p>
                  <FormComponents.Input register={register("emails")} />
                </div>
                <div className="flex flex-col">
                  <p>Título</p>
                  <FormComponents.Input register={register("name")} />
                </div>
                <div className="flex flex-col">
                  <p>Descrição</p>
                  <FormComponents.Input register={register("description")} />
                </div>
              </div>
              <div className="flex h-[50px] w-full items-center">
                <B2BButton
                  loading={isLoading}
                  label="Enviar e-mail"
                  buttonType="submit"
                />
              </div>
            </div>
          </form>
        );
      }}
    </BlobProvider>
  );
}
