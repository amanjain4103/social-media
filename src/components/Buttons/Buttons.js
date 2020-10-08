import Button from "@material-ui/core/Button";
import { styled } from '@material-ui/core/styles';

export const MyBasicButton = styled(Button)({
  padding: "10px 20px",
  fontSize: "20px",
  borderRadius: "0px"
});

export const MySimpleButton = styled(Button)({
  padding: "0px 20px"
});


export const SidebarButton = styled(Button)({
  padding: "10px 0px",
  paddingLeft: "50px",
  fontSize: "20px",
  justifyContent: "flex-start",
  borderRadius: "0px"
});