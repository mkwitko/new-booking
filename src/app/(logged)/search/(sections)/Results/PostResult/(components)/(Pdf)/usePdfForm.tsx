"use client";

import { B2BApi } from "@/infra/api/B2BApi";
import { FilterForm, Schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { blobToBase64 } from "@/utils/B2BUtils";

export function usePdfForm({
  setOpenPdf,
  setIsLoading,
}: {
  setOpenPdf: (bool: boolean) => void;
  setIsLoading: (bool: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FilterForm>({
    resolver: zodResolver(Schema),
  });

  const submit = async (data: FilterForm, blob: any) => {
    setIsLoading(true);
    const emailsTo = data.emails.split(",").map((email) => email.trim());
    await blobToBase64(blob, async (base64: any) => {
      await B2BApi.post("/bookings/send-quote", {
        emailsTo,
        title: data.name,
        description: data.description,
        file: base64.split("base64,")[1],
      });
      setOpenPdf(false);
      setIsLoading(false);
    });
  };
  return { register, handleSubmit, isSubmitting, errors, submit };
}
