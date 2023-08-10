import React, { useState } from 'react';
import { Button, CircularProgress, Container, Input } from '@mui/material';
import { uploadAvatar } from '../../services/UserService';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploadComponent: React.FC<ImageUploadProps> = ({
  onImageUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
      try {
        const response = await uploadAvatar(selectedFile);
        setImageUrl(response.imageUrl);
        onImageUpload(response.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <h2>Image Upload</h2>
      <Input
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile || loading}
      >
        Upload
      </Button>
      {loading && <CircularProgress />}
      {imageUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </Container>
  );
};

export default ImageUploadComponent;
