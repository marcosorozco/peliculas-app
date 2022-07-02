import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useRouter } from 'next/router';

const BuscadorPeliculas = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();

  const onSearch = () => {
    router.push(`/busqueda/${searchValue}`);
  };
  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '50vw',
      }}
    >
      <InputBase
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        onKeyPress={(event) => event.key === 'Enter' && onSearch()}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Encuenta tu pelicula"
        inputProps={{ 'aria-label': 'buscador de peliculas' }}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        onClick={onSearch}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default BuscadorPeliculas;
