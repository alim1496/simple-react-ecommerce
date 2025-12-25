import { FC, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Product } from "../models/Product";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateLoading } from "../redux/features/homeSlice";
import SortProducts from "../components/SortProducts";
import PaginatedProducts from "../components/PaginatedProducts";
import { API_ENDPOINTS } from "../api";

interface Category {
    slug: string;
    name: string;
    url: string;
}

const SearchPage: FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryResults, setCategoryResults] = useState<Category[]>([]);
    const [notFound, setNotFound] = useState(false);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.homeReducer.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        const searchProducts = async () => {
            if (!query) {
                setNotFound(true);
                return;
            }

            dispatch(updateLoading(true));
            setNotFound(false);

            try {
                const productsResponse = await fetch(
                    `${API_ENDPOINTS.PRODUCTS_SEARCH}?q=${encodeURIComponent(query)}`
                );

                const data = await productsResponse.json();

                const productsData = {
                    ...data,
                    products: data.products.filter((p: Product) =>
                        p.title.toLowerCase().includes(query.toLowerCase())
                    ),
                };

                if (productsData.products && productsData.products.length > 0) {
                    setProducts(productsData.products);
                    setCategoryResults([]);
                } else {
                    const categoriesResponse = await fetch(
                        `${API_ENDPOINTS.PRODUCTS_CATEGORIES}`
                    );
                    const categoriesData = await categoriesResponse.json();

                    const matchedCategories = categoriesData.filter(
                        (cat: Category) =>
                            cat.name.toLowerCase().includes(query.toLowerCase()) ||
                            cat.slug.toLowerCase().includes(query.toLowerCase())
                    );

                    if (matchedCategories.length > 0) {
                        setCategoryResults(matchedCategories);
                        setProducts([]);
                    } else {
                        setNotFound(true);
                    }
                }
            } catch (error) {
                console.error("Search error:", error);
                setNotFound(true);
            } finally {
                dispatch(updateLoading(false));
            }
        };

        searchProducts();
    }, [query, dispatch]);

    return (
        <div className="container mx-auto min-h-[83vh] p-4 font-karla">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-lg dark:text-white">
                        Search results for: <span className="font-bold">"{query}"</span>
                    </span>
                    {products.length > 0 && (
                        <SortProducts products={products} onChange={setProducts} />
                    )}
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin mt-32 rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : notFound ? (
                    <div className="text-center mt-32">
                        <p className="text-2xl dark:text-white">
                            Sorry, no such product was found.
                        </p>
                    </div>
                ) : categoryResults.length > 0 ? (
                    <div>
                        <p className="text-lg dark:text-white mb-4">
                            No products found, but here are matching categories:
                        </p>
                        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                            {categoryResults.map((category) => (
                                <div
                                    key={category.slug}
                                    className="bg-gray-100 dark:bg-slate-600 dark:text-white px-4 py-4 font-karla cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-500"
                                    onClick={() => navigate(`/category/${category.slug}`)}
                                >
                                    <div className="text-lg">{category.name}</div>
                                    <span className="text-blue-500 hover:underline">
                                        View products
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <PaginatedProducts
                        products={products}
                        isLoading={isLoading}
                        initialRows={5}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchPage;