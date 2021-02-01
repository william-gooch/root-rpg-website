import React from "react";
import { MenuItem, MenuList, Popover, TextField } from "@material-ui/core";
import "./SearchMenu.scss";

interface SearchMenuProps {
  open: boolean;
  anchorEl: Element | null;
  onClose(): void;
  onSelect(key: string): void;

  items: string[];
  getItemText(key: string): string;
  getItemSubtext?(key: string): string;
  filterPredicate(key: string, filter: string): boolean;
}

const SearchMenu: React.FC<SearchMenuProps> = props => {
  const [filter, setFilter] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(props.items);

  React.useEffect(() => {
    const filtered = props.items.filter(item => props.filterPredicate(item, filter));
    setFilteredItems(filtered);
  }, [filter]);

  return (
    <Popover
      open={props.open}
      onClose={props.onClose}
      anchorEl={props.anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      transformOrigin={{ horizontal: "left", vertical: "bottom" }}
      className="search-menu"
    >
      <TextField
        fullWidth
        variant="outlined"
        className="filter-field"
        value={filter}
        onChange={evt => setFilter(evt.target.value)}
        onKeyPress={evt => {
          if (evt.key === "Enter") {
            if (filteredItems.length >= 0) {
              props.onSelect(filteredItems[0]);
              props.onClose();
            }
          }
        }}
      />
      <MenuList>
        {filteredItems.map(item => (
          <MenuItem
            key={item}
            onClick={() => {
              props.onSelect(item);
              props.onClose();
            }}
          >
            <span className="item-text">{props.getItemText(item)}</span>
            {props.getItemSubtext && <span className="item-subtext">({props.getItemSubtext(item)})</span>}
          </MenuItem>
        ))}
      </MenuList>
    </Popover>
  );
};

export default SearchMenu;
