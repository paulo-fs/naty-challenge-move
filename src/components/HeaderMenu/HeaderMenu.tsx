import { AppBar, Toolbar, IconButton, Avatar, Button, Tooltip, Menu, MenuItem, Typography, Container, Box } from '@mui/material'
import { Menu as MenuIcon, Bolt } from '@mui/icons-material'
import { useState } from 'react'
import Link from 'next/link'

const pages = ['Teste 1', 'Teste 2']
const settings = ['Teste 1', 'Teste 2']

export function HeaderMenu() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  function handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget)
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null)
  }

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget)
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='fixed' variant='outlined' color='primary'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box sx={{ display: 'flex', mr: 1 }}>
            <Bolt sx={{ mr: 1 }} />
            <Typography fontWeight={700}>MOVE</Typography>
          </Box>

          {/* menu mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }} >
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={!!anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none'}, mt: 1 }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => console.log(page)}>
                  <Typography>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* menu desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 8, gap: 4 }}>
            {pages.map((page) => (
              <Link href={`/${page.toLowerCase()}`} key={page}>
                <Button variant='text' sx={{ color: 'white', ":hover": { color: 'Highlight' } }}>
                  { page }
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }}}>
            <Tooltip title='Abrir opções'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='sua foto' src='' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: 6 }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link key={setting} href=''>
                  <MenuItem>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
