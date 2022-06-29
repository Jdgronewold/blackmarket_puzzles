import { Anchor, Box, Header, Menu, Nav, Paragraph, ResponsiveContext } from 'grommet';
import { Menu as MenuIcon, User, UserAdd } from "grommet-icons"

const AppBar = () => {
  return (
    <Header background="dark-1" pad="medium">
        <Box direction="row" align="center" gap="small">
          <Paragraph size='large'>Blackmarket puzzles</Paragraph>
        </Box>
        <ResponsiveContext.Consumer>
          {(responsive) =>
            true ? ( // responsive === 'small'
              <Menu
                icon={<MenuIcon />}
                items={[
                  { label: <Anchor href="/sign-up" label="SignUp" icon={<UserAdd />}/>, onClick: () => {} },
                  { label: <Anchor href="/login" label="Login" icon={<User/>}/>, onClick: () => {} },
                ]}
              />
            ) : (
              <Nav direction="row">
                <Anchor href="/sign-up" label="SignUp" icon={<UserAdd />}/>
                <Anchor href="/login" label="Login" icon={<User/>}/>
              </Nav>
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