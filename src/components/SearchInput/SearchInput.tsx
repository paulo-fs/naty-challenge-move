import { Button, Grid, TextField } from "@mui/material";

interface SearchInputProps {
  searchInputValue: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  clearSearchInput: () => void
}

export function SearchInput(props: SearchInputProps) {
  const { searchInputValue, handleSearch, clearSearchInput } = props;

  return (
    <Grid container>
      <Grid item xs={10}>
            <TextField fullWidth placeholder="Busque por..." size="small"
              value={searchInputValue}
              onChange={handleSearch}
            />
          </Grid>

          <Grid item xs={2} paddingX={2} marginBottom={4}>
              <Button variant="outlined" fullWidth onClick={clearSearchInput}>
                Limpar busca
              </Button>
          </Grid>
    </Grid>
  )
}
