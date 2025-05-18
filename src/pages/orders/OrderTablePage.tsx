import React, { useEffect, useLayoutEffect, useState } from "react";
import TableCard from "@/components/orders/TableCard";
import { useTableVisualizationDetail } from "@/stores/orders/tableVisualization";
import { useDate } from "@/stores/commons/date";
import { TableItemType } from "@/types/modals/modal.types";

const OrderTablePage: React.FC = () => {
  const [cols, setCols] = useState<number>(4);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [cards, setCards] = useState<TableItemType[]>([]);
  const [originalCards, setOriginalCards] = useState<TableItemType[]>([]);

  const { tableList, getAllTableVisualization } = useTableVisualizationDetail();
  const { nowDate } = useDate();

  const getCookie = (name: string): string | undefined => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1];
  };

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

  const gridColsClass =
    cols === 3 ? "grid-cols-3" :
    cols === 4 ? "grid-cols-4" :
    cols === 5 ? "grid-cols-5" :
    "grid-cols-4";
  const rows = Math.ceil(cards.length / cols);

  const handleStartEdit = () => {
    setOriginalCards(cards);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setCards(originalCards);
    setIsEditing(false);
  };

  const handleSave = () => {
    // 로컬 스토리지에 사용자가 선택한 열 저장
    localStorage.setItem('tableCols', String(cols));
    setIsEditing(false);
  };

  useLayoutEffect(() => {
    const boothIdFromCookie = getCookie('boothId');
    if (boothIdFromCookie) {
      getAllTableVisualization({ boothId: boothIdFromCookie, date: nowDate });
    }

    const col = localStorage.getItem('tableCols');
    if (col) {
      setCols(Number(col));
    }
  }, [nowDate]);

  useEffect(() => {
    setCards(tableList);
  }, [tableList]);

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
            {[3, 4, 5].map((num) => (
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
              key={card.tableNumIndex}
              draggable={isEditing}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              className={`transition-transform duration-150 ${
                isEditing ? "cursor-move" : ""
              }`}
            >
              <TableCard table={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTablePage;