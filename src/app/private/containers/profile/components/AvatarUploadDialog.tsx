// AvatarUploadDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
} from '@mui/material';
import ImageAvatar from '../../../../../components/avatar/ImageAvatar';
import ImageUploadComponent from '../../../../../components/form/ImageUploadComponent';

interface AvatarUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onImageUpload: (imageUrl: string) => void;
}

const AvatarUploadDialog: React.FC<AvatarUploadDialogProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onImageUpload,
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle>Upload Avatar</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ImageAvatar
            imageUrl={imageUrl}
            sx={{
              width: 150,
              height: 150,
              mb: '1rem',
            }}
          />
          <Divider />
          <ImageUploadComponent onImageUpload={onImageUpload} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarUploadDialog;
