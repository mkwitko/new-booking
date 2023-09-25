import _ from "lodash";

export const integratedSistems = [
  { label: "Benner", systemId: "benner" },
  { label: "Silbeck", systemId: "silbeck" },
  { label: "BeBooking", systemId: "bebook" },
  { label: "B2B", systemId: "b2b" },
  { label: "Check-in", systemId: "checkin" },
  { label: "APP Sistemas", systemId: "appsis" },
  { label: "Desbravador", systemId: "desbrava" },
  { label: "TOTVS", systemId: "totvs" },
  { label: "B2B RESERVAS", systemId: "b2bhotel" },
  { label: "APP SIS CLOUD", systemId: "appcloud" },
  { label: "CMNET", systemId: "cmnet" },
  { label: "Dhisco", systemId: "dhisco" },
  { label: "Expedia", systemId: "expedia" },
  { label: "Bitz Software", systemId: "bitzsoft" },
];

export function labelSystemIdentity(systemId: string) {
  if (!systemId) {
    throw new Error("SystemId is required");
  }

  const find = _.find(
    integratedSistems,
    (iSystem) => iSystem.systemId === systemId,
  );

  return find?.label;
}
