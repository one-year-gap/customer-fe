import { ProductsFilter } from "@/components/domain/products/ProductsFilter";
import { ProductsHeader } from "@/components/domain/products/ProductsHeader";
import { ProductsList } from "@/components/domain/products/ProductsList";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <ProductsHeader />
      <ProductsFilter />
      <ProductsList />
    </div>
  );
}
