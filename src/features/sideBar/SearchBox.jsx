import { useEffect, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useUi } from "../../contexts/UiContext";

function SearchBox() {
  const { isSearchViewOpen, openSearchView, searchQuery, updateSearchQuery } =
    useUi();
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!isSearchViewOpen && searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, [isSearchViewOpen]);

  return (
    <div className="relative">
      <label htmlFor="searchPeople" className="sr-only">
        Search people
      </label>
      <input
        id="searchPeople"
        className="flex w-full grow items-center justify-between self-stretch overflow-hidden rounded-full border border-LightShade/20 bg-LightShade/10 p-2 pl-9 outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-bgAccent"
        value={searchQuery}
        onChange={(e) => updateSearchQuery(e.target.value)}
        type="text"
        onClick={() => openSearchView()}
        placeholder="Search people"
        aria-label="Search people"
        ref={searchInputRef}
      />

      <span className="pointer-events-none absolute left-3 top-3 text-xl opacity-30">
        <RiSearchLine aria-label="search icon" />
      </span>
    </div>
  );
}

export default SearchBox;
