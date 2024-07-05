import { useUi } from "../../contexts/UiContext";
import SearchView from "../userSearch/SearchView";
import Header from "./Header";
import SearchBox from "./SearchBox";
import UsersView from "./UsersView";

function DefaultView() {
  const { isSearchViewOpen } = useUi();

  return (
    <div className="relative z-30 grid h-screen-safe select-none grid-cols-1 grid-rows-[auto_1fr] overflow-hidden">
      <div className="border-b border-borderShade p-2 dark:border-borderShade-dark">
        <Header />
        <SearchBox />
      </div>

      <div className="h-full overflow-auto">
        {isSearchViewOpen ? <SearchView /> : <UsersView />}
      </div>
    </div>
  );
}

export default DefaultView;
