import {
  Box,
  Collapsible,
  Layer,
  ResponsiveContext,
} from "grommet";

import React from "react";

export const Sidebar = () => {
  const [sidebarOpen] = React.useState(true);
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <>
          {!sidebarOpen || size !== "small" ? (
            <Collapsible direction="horizontal" open={sidebarOpen}>
              <Box
                flex
                width="medium"
                background="light-2"
                elevation="small"
                align="center"
                justify="center"
              >
                sidebar
              </Box>
            </Collapsible>
          ) : (
            <Layer>
              <Box fill background="light-2" align="center" justify="center">
                sidebar
              </Box>
            </Layer>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};
