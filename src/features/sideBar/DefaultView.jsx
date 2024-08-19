import Copyright from "../../components/Copyright";
import { useUi } from "../../contexts/UiContext";
import SearchView from "../userSearch/SearchView";
import Header from "./Header";
import SearchBox from "./SearchBox";
import UsersView from "./UsersView";

function DefaultView() {
  const { isSearchViewOpen } = useUi();

  return (
    <div className="relative z-30 grid h-screen-safe select-none grid-cols-1 grid-rows-[auto_1fr] overflow-hidden">
      <div className="px-2 py-4">
        <Header />
        <SearchBox />
      </div>

      <div className="h-full overflow-auto">
        {isSearchViewOpen ? <SearchView /> : <UsersView />}
      </div>

      <Copyright />
    </div>
  );
}

export default DefaultView;
