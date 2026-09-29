import { categories, pricingBases } from "./cpg-match-review";
export const vendorFields = [
  "vendorName",
  "category",
  "services",
  "projectTypes",
  "bestFit",
  "cannotServe",
  "pricingRange",
  "currency",
  "pricingBasis",
  "inclusions",
  "minimum",
  "leadTime",
  "availability",
  "geography",
  "productionConstraints",
  "logisticsConstraints",
  "inquiryName",
  "inquiryEmail",
] as const;
export const productionCategories = [
  "Co-manufacturing",
  "Packaging Suppliers",
  "R&D / formulation",
];
export function parseVendorIntake(body: Record<string, unknown>) {
  const data: Record<string, string> = {};
  for (const field of vendorFields) {
    if (body[field] != null && typeof body[field] !== "string")
      throw new Error(`Invalid ${field}.`);
    data[field] = String(body[field] || "").trim();
    if (data[field].length > 2000) throw new Error(`${field} is too long.`);
  }
  if (
    !data.vendorName ||
    !data.services ||
    !categories.includes(data.category) ||
    !/^\S+@\S+\.\S+$/.test(data.inquiryEmail)
  )
    throw new Error(
      "Please provide vendor name, category, main services, and a valid inquiry email.",
    );
  if (
    data.pricingRange &&
    (!/^[A-Z]{3}$/.test(data.currency) ||
      !pricingBases.includes(data.pricingBasis))
  )
    throw new Error("Add a currency and pricing basis for the pricing range.");
  if (body.confirmed !== true)
    throw new Error(
      "Please confirm that you represent this vendor and the information is current.",
    );
  if (!productionCategories.includes(data.category))
    data.productionConstraints = "";
  if (data.category !== "3PL / logistics") data.logisticsConstraints = "";
  return data;
}
