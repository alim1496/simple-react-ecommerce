import { FC, useState, KeyboardEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchBar: FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="lg:flex hidden w-center max-w-[500px] border-1 border-blue-500 rounded overflow-hidden">
            <input
                type="text"
                placeholder="Search for a product..."
                className="border-2 border-blue-500 px-6 py-2 w-full dark:text-white dark:bg-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <div
                className="bg-blue-500 text-white text-[26px] grid place-items-center px-4 cursor-pointer hover:bg-blue-600"
                onClick={handleSearch}
            >
                <BsSearch />
            </div>
        </div>
    );
};

export default SearchBar;