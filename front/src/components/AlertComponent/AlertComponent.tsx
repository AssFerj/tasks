import { Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AlertColor } from '@mui/material/Alert';

interface AlertComponentProps {
  alertState: {
    actionShowAlert: boolean;
    message: string;
    typeAlert: AlertColor | string;
  };
  actionShowAlertFc: () => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ alertState, actionShowAlertFc }) => {
  const { actionShowAlert, message, typeAlert } = alertState;
  return (
    <>
      <Collapse
        in={actionShowAlert}
        style={{
          margin: 0,
          padding: 0,
          position: 'absolute',
          zIndex: 999,
          bottom: 5,
          right: 5
        }}
      >
        <Alert
          severity={typeAlert as AlertColor}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={actionShowAlertFc}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </>
  );
};

export default AlertComponent;