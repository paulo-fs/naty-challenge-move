import { AppBar, Toolbar, IconButton, Avatar, Button, Tooltip, Menu, MenuItem, Typography, Container, Box } from '@mui/material'
import { Menu as MenuIcon, Bolt } from '@mui/icons-material'
import Link from 'next/link'
import { HeaderMenuProps } from './HeaderMenu.props'
import { useHeaderMenu } from './HeaderMenu.controller'

export function HeaderMenu(data: HeaderMenuProps) {
  const { pages, settings } = data
  const {
    anchorElNav,
    anchorElUser,
    exitSetting,
    handleCloseNavMenu,
    handleCloseUserMenu,
    handleOpenNavMenu,
    handleOpenUserMenu
  } = useHeaderMenu()

  const updateSettings = settings
    ? [ ...settings, exitSetting ]
    : [exitSetting]

  return (
    <AppBar position='fixed' variant='outlined' elevation={0} color='primary'>
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
              {pages && pages.map((page) => (
                <MenuItem key={page.title}>
                  <Link href={`/${page.url.toLowerCase()}`} key={page.title}>
                    <Button onClick={handleCloseUserMenu}>{page.title}</Button>
                  </Link>
                </MenuItem>
              ))}
              {updateSettings && updateSettings.map((setting) => (
                <MenuItem key={setting.title}>
                  <Link href={setting.url!}>
                    <Button>{setting.title}</Button>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* menu desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 8, gap: 4 }}>
            {pages && pages.map((page) => (
              <Link href={`/${page.url.toLowerCase()}`} key={page.title}>
                <Button variant='text' sx={{ color: 'white', ":hover": { color: 'Highlight' } }}>
                  { page.title }
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
              sx={{ mt: 1 }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {updateSettings && updateSettings.map((setting) => (
                <Link key={setting.url} href={setting.url ?? ''} prefetch>
                  <MenuItem onClick={setting.action}>
                    <Button>{setting.title}</Button>
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
