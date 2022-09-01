import React, { useRef } from 'react';
import { Avatar, Box, CircularProgress, Fab } from '@mui/material';
import {
  Person as PersonIcon,
  AddAPhoto as AddAPhotoIcon
} from '@mui/icons-material';
import { useAvatarUpload } from './hooks';

interface AvatarUploadProps {
  avatarUrl: string | Error;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string | Error>>
}

export const AvatarUpload = ({ avatarUrl, setAvatarUrl }: AvatarUploadProps) => {
  const [ setFile, loading ] = useAvatarUpload(setAvatarUrl);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  // const [ selectedFile, setSelectedFile ] = React.useState<File | null>(null);
  // const fileUploadRef = useRef<HTMLInputElement>(null);
  // const [ loading, setLoading ] = React.useState(false);

  // React.useEffect(() => {
  //   if (selectedFile === null) return;
  //   setLoading(true);
  //   const formData = new FormData();
    
  //   formData.append('file', selectedFile);
  //   // fontData.append('api_key', apiKey);
  //   formData.append('upload_preset', uploadPreset);
    
  //   processRequest<uploadResponseData>(apiUrl, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((data: uploadResponseData) => setAvatarUrl(data.secure_url))
  //     .catch((error: Error) => setAvatarUrl(error))
  //     .finally(() => setLoading(false))

  // }, [selectedFile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    if (el.files !== null) {
      setFile(el.files[0]);
    }
  }

  const handleUploadClick = () => {
    fileUploadRef.current?.click();
  }

  const avatarUrlToShow = avatarUrl instanceof Error ? '' : avatarUrl;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Avatar sx={{ width: 120, height: 120 }} src={avatarUrlToShow}>
          <PersonIcon sx={{ width: 100, height: 100 }} />
        </Avatar>
        <input
          style={{ display: "none"}}
          ref={fileUploadRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange} />
        <Fab
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
          onClick={handleUploadClick}>
            {loading
              ? <CircularProgress size={20} sx={{ color: "primary.contrastText" }}/>
              : <AddAPhotoIcon fontSize="small"/>}
        </Fab>
      </Box>
    </Box>
  )
}