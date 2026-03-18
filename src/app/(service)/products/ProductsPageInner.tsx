"use client";

import { useState } from "react";

import CompareModal from "@/components/domain/products/modals/CompareModal";
import ChangeCompleteModal from "@/components/domain/products/modals/CompleteModal";
import ConfirmChangeModal from "@/components/domain/products/modals/ConfirmModal";
import DetailModal from "@/components/domain/products/modals/DetailModal";
import { ProductsFilter } from "@/components/domain/products/ProductsFilter";
import { ProductsHeader } from "@/components/domain/products/ProductsHeader";
import { ProductsList } from "@/components/domain/products/ProductsList";
import { useChangePlan } from "@/lib/tanstack/mutation/useChangePlan";
import type { ProductType } from "@/models/log";

type ModalType = "none" | "detail" | "compare" | "confirmChange" | "changeComplete";

export default function ProductsPageInner() {
  const [modal, setModal] = useState<ModalType>("none");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ✅ category 상태로 관리
  const [category, setCategory] = useState<ProductType>("mobile");

  const { mutateAsync } = useChangePlan();

  const handleConfirmChange = async () => {
    if (!selectedId) return;

    try {
      await mutateAsync({
        targetProductId: selectedId,
      });

      setModal("changeComplete");
    } catch (error) {
      console.error("요금제 변경 실패", error);
    }
  };

  return (
    <div className="space-y-6">
      <ProductsHeader />

      {/* ✅ 필터 변경 시 상태 업데이트 */}
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
        targetPlanId={selectedId}
        onClose={() => setModal("none")}
      />

      <ConfirmChangeModal
        open={modal === "confirmChange"}
        onCancel={() => setModal("compare")}
        onConfirm={handleConfirmChange}
      />

      <ChangeCompleteModal open={modal === "changeComplete"} onClose={() => setModal("none")} />
    </div>
  );
}
