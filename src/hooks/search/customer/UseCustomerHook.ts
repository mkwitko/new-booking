import {
  ICustomersResponse,
  customerResponseData,
} from "@/DTO/customers/CustomerDTO";
import { B2BApi } from "./../../../infra/api/B2BApi";
import { useState } from "react";

export default function UseCustomersHook() {
  // FIXME - Passar para a utilização de classe, as descrições de queries não são feitas dentro de hooks e sim dentro da classe @SAIMON

  const getAgencyCustomers = async (companyId: number) => {
    try {
      const response = await (
        await B2BApi.get("/customers", {
          headers: { "X-Company-Id": companyId },
        })
      ).data;
      setAgencyCustomers(response.data);
    } catch (e: any) {
      console.log("error", e);
    }
  };

  const [agencyCustomers, setAgencyCustomers] =
    useState<customerResponseData[]>();

  return {
    agencyCustomers,
    setAgencyCustomers,
    getAgencyCustomers,
  };
}
