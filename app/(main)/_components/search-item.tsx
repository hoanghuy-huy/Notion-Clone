import { Search } from "lucide-react";
import React from "react";

const SearchItem = () => {
  return (
    <div className="w-full flex items-center btn-hover-effect gap-2 p-1" role="button">
      <div>
        <Search size={18}/>
      </div>
      <h2>Search</h2>
    </div>
  );
};

export default SearchItem;
