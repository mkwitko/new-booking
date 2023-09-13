import { Box, Modal } from '@mui/material';
import React, { ReactNode } from 'react';

const style = {
  position: 'absolute',
  bgcolor: 'background.paper',
  boxShadow: 24,
  border: '2px solid rgba(140, 140, 140, 0.20)',
  overflowY: 'auto',
};

export default function Container({
  open,
  handleClose,
  children,
  top = '6rem',
  height = '75rem',
  width = '20rem',
  anchor = 'right',
}: {
  open: boolean;
  handleClose: any;
  children: ReactNode;
  top?: string;
  height?: string;
  width?: string;
  anchor?: 'left' | 'right' | 'center';
}) {
  let border;
  if (anchor === 'left') {
    border = '0 0.625rem 0.625rem 0';
  } else if (anchor === 'right') {
    border = '0.625rem 0 0 0.625rem';
  } else if (anchor === 'center') {
    border = '0.625rem';
  }

  const styled: any = {
    ...style,
    [anchor]: 0,
    top,
    maxHeight: height,
    minWidth: width,
    borderRadius: border,
  };

  if (anchor === 'center') {
    delete styled[anchor];
    styled.top = `calc(50% - ${height} / 2)`;
    styled.left = `calc(50% - ${width} / 2)`;
    styled.height = height;
    styled.width = width;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown
    >
      <Box sx={styled}>{children}</Box>
    </Modal>
  );
}
