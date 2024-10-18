import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useState } from 'react';
import { mutate } from 'swr';
import { Input, InputAdornment } from '@mui/material';

interface ISearchBarProps {
  onSearch: (searchString: string) => void;
}

const SearchBar: FC<ISearchBarProps> = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = (keyword: string) => {
    onSearch(keyword);
  };

  return (
    <Input
      sx={{ margin: '10px' }}
      value={searchKeyword}
      placeholder="Keyword & hit Enter"
      onChange={handleInputChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch(searchKeyword);
        }
      }}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

export default SearchBar;
