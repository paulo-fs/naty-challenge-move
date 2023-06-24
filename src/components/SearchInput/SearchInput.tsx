import { Button, Grid, TextField } from "@mui/material";

interface SearchInputProps {
  searchInputValue: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  clearSearchInput: () => void
}

export function SearchInput(props: SearchInputProps) {
  const { searchInputValue, handleSearch, clearSearchInput } = props;

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12} sm={8} md={9} lg={10}>
            <TextField fullWidth placeholder="Busque por..." size="small"
              value={searchInputValue}
              onChange={handleSearch}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={2} paddingX={2} marginBottom={4}>
              <Button variant="outlined" fullWidth onClick={clearSearchInput}>
                Limpar
              </Button>
          </Grid>
    </Grid>
  )
}
