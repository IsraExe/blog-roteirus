import Image from 'next/image';
import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import Label from '../Label';

type DragImageProps = {
  getCoverImage: (data: string) => void;
  defaultImage?: string;
};

const DragImage = ({ getCoverImage, defaultImage }: DragImageProps) => {
  const [image, setImage] = useState<string | undefined>(defaultImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      Resizer.imageFileResizer(
        uploadedFile,
        200, // max width
        150, // max height
        'PNG', // output type
        100, // quality
        0, // rotation
        (uri) => {
          setImage(uri as string);
          getCoverImage(uri as string);
        },
        'base64' // output type
      );
    }
  };

  return (
    <div>
      <Label text='Foto do seu post' htmlFor='file_upload' />
      <fieldset
        className='flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
        onClick={() => document.getElementById('file_upload')?.click()}
      >
        <div className='flex flex-col items-center space-y-2'>
          {!image && <p>Upload your image here</p>}
          {image && <Image src={image} alt='Uploaded' className='w-full h-auto rounded-md' width={200} height={200} />}
        </div>
        <input
          id='file_upload'
          type='file'
          name='file_upload'
          className='hidden'
          onChange={handleFileChange}
        />
      </fieldset>
    </div>
  );
};

export default DragImage;
