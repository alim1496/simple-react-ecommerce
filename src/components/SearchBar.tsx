import { FC, useState, KeyboardEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
    onSearch?: () => void;
}   

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            onSearch?.();
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    // lg:flex hidden 
    return (
        <div className="flex w-center max-w-[500px] border-1 border-blue-500 mx-5 rounded overflow-hidden">
            <input
                type="text"
                placeholder="apple.."
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