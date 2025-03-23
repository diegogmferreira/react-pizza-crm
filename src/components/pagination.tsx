import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";

export interface PaginationProps {
  totalItems: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => Promise<void> | void;
}

export function Pagination({ totalItems, currentPage, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const isFirstPage = currentPage === 0;
  const isLastPage = totalPages <= currentPage + 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalItems} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium"> Página {currentPage + 1} de {totalPages}</div>

        <div className="flex items-center gap-2">
          <Button onClick={() => onPageChange(0)} variant="outline" className="h-8 w-8 p-0" disabled={isFirstPage}>
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button onClick={() => onPageChange(currentPage - 1)} variant="outline" className="h-8 w-8 p-0" disabled={isFirstPage}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button onClick={() => onPageChange(currentPage + 1)} variant="outline" className="h-8 w-8 p-0" disabled={isLastPage}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button onClick={() => onPageChange(totalPages - 1)} variant="outline" className="h-8 w-8 p-0" disabled={isLastPage}>
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>

    </div>
  )
}