import { useState } from 'react';

type Props = {
  setPhoto: (url: string) => void;
  setIsLoadingPhoto: (url: boolean) => void;
};

const MAX_FILE_SIZE_MB = 5;

const ImageUploader = ({ setPhoto, setIsLoadingPhoto }: Props) => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Only images are allowed to be uploaded.');
      return;
    }

    const sizeInMB = selectedFile.size / (1024 * 1024);

    if (sizeInMB > MAX_FILE_SIZE_MB) {
      setError(`Maximum file size — ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setIsLoadingPhoto(true);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'flowboard');

      const res = await fetch('https://api.cloudinary.com/v1_1/dvv1gt8mp/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!data.secure_url) throw new Error('Error loading the image.');

      setUrl(data.secure_url);
      setPhoto(data.secure_url);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setIsLoadingPhoto(false);
    }
  };

  return (
    <div className={`image__uploader ${error ? 'image__uploader-error' : ''}`}>
      <label className='image__uploader--label'>
        {isLoading && (
          <div className='loader__container'>
            <p> The image is being uploaded...</p>
            <span className='loader__small'></span>
          </div>
        )}
        {!isLoading && !url && (
          <div className='loader__container'>
            <p>📷 Upload a photo (optional)</p>
            <div className='arrow-circly--wrapper'>
              <img
                className='arrow-circly'
                src='/images/arrow-circlу.svg'
                width='24px'
                height='24px'
              />
            </div>
            <input
              className='image__uploader--input visually-hidden'
              type='file'
              accept='image/*'
              onChange={handleUploadChange}
            />
          </div>
        )}
        {url && !isLoading && (
          <div className='loader__container'>
            <p className='image__uploader--title'>
              {' '}
              📷 Image uploaded <span className='upload__successfully'>successfully</span>
            </p>
            <div className='arrow-circly--wrapper'>
              <img
                className='arrow-circly'
                src='/images/arrow-circlу.svg'
                width='24px'
                height='24px'
              />
            </div>
            <input
              className='image__uploader--input visually-hidden'
              type='file'
              accept='image/*'
              onChange={handleUploadChange}
            />
          </div>
        )}
      </label>
      {error && <span className='upload__error'>{error}</span>}
    </div>
  );
};

export default ImageUploader;
