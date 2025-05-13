import React, { useState } from "react";
import TableCard from "@/components/orders/TableCard";

interface CardData {
  id: string;
  type: string;
}

const initialCards: CardData[] = [
  { id: "1", type: "ready" },
  { id: "2", type: "cooking" },
  { id: "3", type: "finish" },
  { id: "4", type: "ready" },
  { id: "5", type: "cooking" },
  { id: "6", type: "finish" },
  { id: "7", type: "ready" },
  { id: "8", type: "cooking" },
  { id: "9", type: "finish" },
  { id: "10", type: "ready" },
  { id: "11", type: "cooking" },
  { id: "12", type: "finish" },
  { id: "13", type: "ready" },
  { id: "14", type: "cooking" },
  { id: "15", type: "finish" },
];

const OrderTablePage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [originalCards, setOriginalCards] = useState<CardData[]>(initialCards); // 원본 상태 보관
  const [isEditing, setIsEditing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [cols, setCols] = useState<number>(4);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...cards];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setCards(updated);
    setDraggedIndex(null);
  };

  // 열 수 계산
  const gridColsClass =
    cols === 4 ? "grid-cols-4" :
    cols === 5 ? "grid-cols-5" :
    cols === 6 ? "grid-cols-6" :
    "grid-cols-4";
  const rows = Math.ceil(cards.length / cols);

  const handleStartEdit = () => {
    setOriginalCards(cards); // 편집 시작 시 현재 상태 저장
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setCards(originalCards); // 이전 상태로 복구
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false); // 저장 시 따로 복구 필요 없음
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-end pb-4 gap-2">
        {isEditing && (
          <button
            type="button"
            className="is-button is-outlined py-2 px-6 text-sm"
            onClick={handleCancelEdit}
          >
            취소
          </button>
        )}
        <button
          type="button"
          className="is-button py-2 px-6 text-sm"
          onClick={isEditing ? handleSave : handleStartEdit}
        >
          {isEditing ? "저장" : "테이블 순서 변경"}
        </button>
      </div>

      {isEditing && (
        <div className="w-full flex justify-center items-center pb-10">
          <label className="mr-2 text-sm font-medium">테이블 열 선택:</label>
          <select
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="border px-2 py-1 text-sm rounded"
          >
            {[4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}열
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-center">
        <div
          className={`max-w-[1100px] grid gap-8 justify-items-center ${gridColsClass}`}
          style={{
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              draggable={isEditing}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className={`transition-transform duration-150 ${
                isEditing ? "cursor-move" : ""
              }`}
            >
              <TableCard type={card.type} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTablePage;