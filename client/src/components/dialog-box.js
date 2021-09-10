import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

function DialogBox({
	fullScreen = false,
	disabled = false,
	loading = false,
	open,
	showAction = true,
	handleSubmit,
	handleClose,
	title = 'Are you Sure ?',
	children,
	action = 'Confirm',
	cancel = 'Cancel'
}) {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			fullScreen={fullScreen}
			TransitionComponent={Transition}
		>
			<DialogTitle>{title}</DialogTitle>
			{children && <DialogContent>{children}</DialogContent>}
			<DialogActions>
				<Button
					disabled={loading}
					onClick={handleClose}
					size='small'
					variant='outlined'
					color='primary'
				>
					{cancel}
				</Button>
				{showAction && (
					<Button
						disabled={loading || disabled}
						onClick={handleSubmit}
						size='small'
						variant='contained'
						color='secondary'
					>
						{action}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}

export default DialogBox;
