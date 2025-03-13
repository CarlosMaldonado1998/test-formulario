import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid2, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import NavIcon from "./NavIcon";
import { useAuth } from "../../lib/AuthContext";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function ElevationScroll(props) {
  const { children } = props;

  return React.cloneElement(children, {
    elevation: 4,
    style: {
      backgroundColor: "rgba(139, 231, 211, 0.95)",
      color: "rgba(46, 209, 174, 0.95)",
    },
  });
}

const Navigation = (props) => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="sticky" open={open}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap component="div" color="white">
                Prueba de Formularios
              </Typography>
            </Box>
            {user ? (
              <Box sx={{ paddingLeft: 5 }}>
                <Grid2 container spacing={1}>
                  <Typography variant="p" noWrap component="div" color="white">
                    {user?.email}
                  </Typography>
                  <NavIcon onHandleDrawerClose={handleDrawerClose} />
                </Grid2>
              </Box>
            ) : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Navigation;
