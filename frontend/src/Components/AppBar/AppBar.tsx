import { AddCircle, Login, Logout, Menu as MenuIcon, UserAdd } from "grommet-icons"
import { Anchor, Box, Header, Menu, Paragraph, ResponsiveContext } from 'grommet';

import { isAuthenticated } from 'Utils/isAuthenticated';
import { logout } from 'Utils/logout';
import { useAppDispatch } from "State/store";
import { userRemoved } from "../../State/User/userReducer"

const AppBar = () => {
  const dispatch = useAppDispatch()
  const logoutAction = () => {
    logout()
    dispatch(userRemoved)
  }
  return (
    <Header background="dark-1" pad="medium">
        <Box direction="row" align="center" gap="small">
          <Anchor href="/home">
           <Paragraph size='large'>Blackmarket puzzles</Paragraph>
          </Anchor>
        </Box>
        <ResponsiveContext.Consumer>
          {(responsive) =>
            isAuthenticated() ? 
            (
              <Menu
              icon={<MenuIcon />}
              items={[
                { label: <Anchor href="/create-puzzle" label="Add Puzzle" icon={<AddCircle />}/>},
                { label: <Anchor href="/" label="Log out" icon={<Logout />}/>, onClick: logoutAction},
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