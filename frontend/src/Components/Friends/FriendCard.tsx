import { Box, Heading, Text } from "grommet";

import { IFriendWithUser } from "Types/Friend";

export const FriendCard = ({
  friend: { friendUser, friendship },
}: {
  friend: IFriendWithUser;
}) => {
  const friendStatus = friendship.Friends
    ? "Friends!"
    : ((friendship.UserOneID === friendUser.ID &&
      friendship.Pending_First_Second) || 
      (friendship.UserTwoID === friendUser.ID &&
        friendship.Pending_Second_First))
    ? "Sent Request!"
    : "Received Request!";
  return (
    <Box round="xxsmall" elevation="small" overflow="hidden">
      <Box pad={{ horizontal: "small" }}>
        <Box
          margin={{ top: "small" }}
          direction="row"
          align="center"
          justify="between"
        >
          <Box>
            <Heading level="3" margin="none">
              {friendUser.username}
            </Heading>
          </Box>

          <Box align="end" justify="between" gap="xsmall">
            <Text color="dark-5" size="xsmall">
              Status: {friendStatus}
            </Text>
          </Box>
        </Box>
        <Text
          size="small"
          color="dark-5"
          margin={{ vertical: "small" }}
          truncate
        >
          Weeeee
        </Text>
      </Box>
    </Box>
  );
};
