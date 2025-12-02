// PaginatedProducts.tsx
import { FC, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../models/Product";

interface Props {
    products: Product[];
    isLoading: boolean;
    initialRows?: number; // скільки рядків показувати спочатку (за замовчуванням 5)
}

const getColumnsForWidth = (width: number) => {
    // Tailwind default breakpoints:
    // sm: 640, md: 768, lg: 1024, xl: 1280
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 768) return 2; // md
    return 1; // sm і менше
};

const PaginatedProducts: FC<Props> = ({ products, isLoading, initialRows = 5 }) => {
    const [rowsToShow, setRowsToShow] = useState<number>(initialRows);
    const [columns, setColumns] = useState<number>(() =>
        typeof window !== "undefined" ? getColumnsForWidth(window.innerWidth) : 4
    );

    useEffect(() => {
        const handleResize = () => {
            setColumns(getColumnsForWidth(window.innerWidth));
        };
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            // викличемо один раз, щоб впевнитися у правильних колонках
            handleResize();
        }
        return () => {
            if (typeof window !== "undefined") window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Скільки елементів показувати зараз
    const itemsPerPage = useMemo(() => rowsToShow * columns, [rowsToShow, columns]);

    const visibleProducts = products.slice(0, itemsPerPage);
    const allShown = visibleProducts.length >= products.length;

    // клас сітки залишаємо як у вас, щоб стилі відповідали Tailwind breakpoints
    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin mt-32 rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
            ) : (
                <>
                    <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {visibleProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>

                    {!allShown && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setRowsToShow((r) => r + initialRows)}
                                className="px-4 py-2 rounded-md border dark:border-neutral-700 dark:text-white hover:shadow"
                            >
                                View more
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default PaginatedProducts;
