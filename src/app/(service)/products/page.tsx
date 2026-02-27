import { ProductsFilter } from "@/components/domain/products/ProductsFilter";
import { ProductsHeader } from "@/components/domain/products/ProductsHeader";
import { ProductsList } from "@/components/domain/products/ProductsList";

export default function ProductsPage() {
  return (
    <div>
      <section className="col-span-4">
        <ProductsHeader />
      </section>
      <section className="col-span-4">
        <ProductsFilter />
      </section>
      <section className="col-span-4">
        <ProductsList />
      </section>
    </div>
  );
}
