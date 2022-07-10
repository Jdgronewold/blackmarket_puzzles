import { Grid, ResponsiveContext } from "grommet"

import { FriendCard } from "./FriendCard"
import { IFriendWithUser } from "Types/Friend"

export const FriendList = ({ friends }: { friends: IFriendWithUser[] }) => {
  return (
    <ResponsiveContext.Consumer>
    {size => (
      <Grid
        align="start"
        columns={size !== "small" ? { count: "fill", size: "medium" } : { count: "fit", size: "small"}}
        gap="medium"
        margin="medium"
      >
        {friends.map((friend) => (
          <FriendCard
            key={friend.friendUser.ID}
            friend={friend}
          />
        ))}
      </Grid>
    )}
  </ResponsiveContext.Consumer>
  )
}