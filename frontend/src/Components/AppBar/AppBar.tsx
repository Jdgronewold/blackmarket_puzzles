import { Anchor, Box, Header, Menu, Paragraph, ResponsiveContext } from 'grommet';
import { Login, Logout, Menu as MenuIcon, UserAdd } from "grommet-icons"

import { isAuthenticated } from 'Utils/isAuthenticated';
import { logout } from 'Utils/logout';
import { useDispatch } from 'react-redux';
import { userRemoved } from "../../State/User/userReducer"

const AppBar = () => {
  const dispatch = useDispatch()
  const logoutAction = () => {
    logout()
    dispatch(userRemoved)
  }
  return (
    <Header background="dark-1" pad="medium">
        <Box direction="row" align="center" gap="small">
          <Paragraph size='large'>Blackmarket puzzles</Paragraph>
        </Box>
        <ResponsiveContext.Consumer>
          {(responsive) =>
            isAuthenticated() ? 
            (
              <Menu
              icon={<MenuIcon />}
              items={[
                { label: <Anchor href="/" label="Log out" icon={<Logout />}/>, onClick: {logoutAction}},
              ]}
            />
            ): ( // responsive === 'small'
                <Menu
                icon={<MenuIcon />}
                items={[
                  { label: <Anchor href="/sign-up" label="Sign Up" icon={<UserAdd />}/>, onClick: () => {} },
                  { label: <Anchor href="/login" label="Login" icon={<Login/>}/>, onClick: () => {} },
                ]}
              />
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
  )
};

export const AppHeader = () => {
  return (
    <AppBar />
        )
}