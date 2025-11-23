import React from "react";
import ListCatalog from "./ListCatalog";
import { getAllCatalog } from "../getData";

export default async function CatalogPage() {
  const listCatalog = await getAllCatalog();
  return <ListCatalog listCatalogs={listCatalog.catalogs} />;
}
