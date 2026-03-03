"use client";

import { useState } from "react";

import CompareModal from "@/components/domain/products/modals/CompareModal";
import ChangeCompleteModal from "@/components/domain/products/modals/CompleteModal";
import ConfirmChangeModal from "@/components/domain/products/modals/ConfirmModal";
import DetailModal from "@/components/domain/products/modals/DetailModal";
import { ProductsFilter } from "@/components/domain/products/ProductsFilter";
import { ProductsHeader } from "@/components/domain/products/ProductsHeader";
import { ProductsList } from "@/components/domain/products/ProductsList";

type ModalType = "none" | "detail" | "compare" | "confirmChange" | "changeComplete";

export default function ProductsPage() {
  const [modal, setModal] = useState<ModalType>("none");
  const [category, setCategory] = useState<string>("mobile");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <ProductsHeader />
      <ProductsFilter selected={category} onChange={setCategory} />
      <ProductsList
        category={category}
        onOpenDetail={(id) => {
          setSelectedId(id);
          setModal("detail");
        }}
      />

      <DetailModal
        open={modal === "detail"}
        productId={selectedId}
        onClose={() => setModal("none")}
        onCompare={() => setModal("compare")}
      />

      <CompareModal
        open={modal === "compare"}
        onClose={() => setModal("none")}
        onChangePlan={() => setModal("confirmChange")}
      />

      <ConfirmChangeModal
        open={modal === "confirmChange"}
        onCancel={() => setModal("compare")}
        onConfirm={() => setModal("changeComplete")}
      />

      <ChangeCompleteModal open={modal === "changeComplete"} onClose={() => setModal("none")} />
    </div>
  );
}
