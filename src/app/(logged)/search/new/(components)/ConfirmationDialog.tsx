import B2BButton from "@/components/interactiveComponents/Button";
import Link from "next/link";
import * as Modal from "@/components/nonInteractiveComponents/Modal";

interface ConfirmationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: any;
}

export default function ConfirmationDialog({
  open,
  setOpen,
  content,
}: ConfirmationDialogProps) {
  const getTheFullDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`;
  };

  const getTheDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  if (!content) return null;

  return (
    <Modal.Modal open={open} setOpen={setOpen}>
      <Modal.ModalContent mergeClasses="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col gap-0 max-w-[90%] md:max-w-[750px] p-0 z-[60] overflow-hidden rounded-b2b">
        <h1 className="text-center md:text-left px-4 md:px-6 pt-4 md:pt-6 font-semibold uppercase text-primary">
          Reserva Confimada
        </h1>

        <div className="mt-4 md:mt-8 flex w-full flex-col gap-4 md:gap-6 border-b border-borderColor/20 px-6 pb-6">
          <div className="flex w-full items-end justify-start gap-6">
            <div>
              <span className="block text-xs uppercase text-textPrimary">
                Nº da Reserva
              </span>
              <span className="mt-1 block text-xl md:text-xlarge/none font-light text-secondary-500">
                {content.bookingId}
              </span>
            </div>

            <div className="space-y-1">
              <span className="rounded-full border border-success px-2 py-1 text-extraSmall font-bold text-success">
                Confirmada
              </span>
              <span className="block text-xs text-textSecondary">
                Realizada em: {getTheFullDate(new Date(content.confirmation))}
              </span>
            </div>

            {/* <Link
                href="/"
                className="block text-xs font-bold uppercase text-secondary-500 transition-colors hover:text-secondary-700"
              >
                Visualizar Voucher
              </Link> */}
          </div>

          <div className="grid w-full md:grid-cols-[18rem_18rem] grid-cols-1 gap-x-4 gap-y-2 max-h-24 overflow-y-auto md:max-h-none pr-2 truncate">
            <div className="grid w-full grid-cols-[100px_1fr] md:grid-cols-2 items-center gap-x-4 gap-y-2">
              <span className="text-xs text-textPrimary">Hotel</span>
              <span className="text-xs text-textSecondary truncate">{content.hotelId}</span>
            </div>

            <div className="grid w-full grid-cols-[100px_1fr] md:grid-cols-2 items-center gap-x-4 gap-y-2">
              <span className="text-xs text-textPrimary">Hóspede</span>
              <span className="text-xs text-textSecondary truncate">
                {content.guests[0]}
              </span>
            </div>

            <div className="grid w-full grid-cols-[100px_1fr] md:grid-cols-2 items-center gap-x-4 gap-y-2">
              <span className="text-xs text-textPrimary">Cliente</span>
              <span className="text-xs text-textSecondary truncate">{content.customer}</span>
            </div>

            <div className="grid w-full grid-cols-[100px_1fr] md:grid-cols-2 items-center gap-x-4 gap-y-2">
              <span className="text-xs text-textPrimary">Check-in</span>
              <span className="text-xs text-textSecondary truncate">
                {getTheDate(new Date(content.startDate))}
              </span>
            </div>

            <div className="grid w-full grid-cols-[100px_1fr] md:grid-cols-2 items-center gap-x-4 gap-y-2">
              <span className="text-xs text-textPrimary">
                Forma de Pagamento
              </span>
              <span className="text-xs text-textSecondary truncate">
                {content.paymentMethod}
              </span>
            </div>

            <div className="grid w-full grid-cols-[100px_1fr] md:grid-cols-2 items-center gap-x-4 gap-y-2">
              <span className="text-xs text-textPrimary">ID do VCN</span>
              <span className="text-xs text-textSecondary truncate">{content.creditCard.vcnId}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 flex w-full flex-col gap-4 md:gap-6 px-6 pb-4 md:pb-6">
          <div className="grid grid-cols-2 md:flex md:items-center md:justify-start gap-4 md:gap-10">
            <div className="space-y-1 md:space-y-2">
              <span className="block md:text-base text-smfont-semibold uppercase text-primary">
                Check-in
              </span>
              <span className="block text-xs text-textSecondary">
                Após às {content.checkin}
              </span>
            </div>

            <div className="space-y-1 md:space-y-2">
              <span className="block md:text-base text-smfont-semibold uppercase text-primary">
                Check-out
              </span>
              <span className="block text-xs text-textSecondary">
                Até às {content.checkout}
              </span>
            </div>

            <div className="space-y-1 md:space-y-2">
              <span className="block md:text-base text-smfont-semibold uppercase text-primary">
                Cancelamento
              </span>
              <span className="block text-xs text-textSecondary">
                Até o dia {getTheDate(new Date(content.cancellationDeadline))}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="block font-semibold uppercase text-primary">
              Observações
            </span>
            <div className="max-h-[100px] overflow-y-auto pr-6 text-xs text-textSecondary">
              {content.hotelPolicy}
            </div>
          </div>
        </div>

        <div className="bg-backgroundDefault flex w-full flex-row items-center gap-4 px-6 py-4 justify-end">
          <B2BButton onClick={() => setOpen(false)} mergeClass="w-auto px-3 py-2" label="Voltar" color="disabled" />

          <Link href="/search">
            <B2BButton
              mergeClass="w-auto px-3 py-2 transition-colors"
              buttonType="button"
              label="Nova Pesquisa"
            />
          </Link>
        </div>
      </Modal.ModalContent>
    </Modal.Modal>
  );
}
