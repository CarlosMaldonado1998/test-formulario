import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Link as MuiLink,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../../auth/actions/route";
import { useRouter } from "next/navigation";

const NavIcon = ({ onHandleDrawerClose }) => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon color="black" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          <Typography textAlign="center" color="textBlack">
            Cerrar sesión
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavIcon;
