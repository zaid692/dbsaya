import React from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export default function Modal({ isOpen, title, onClose, onSave }: ModalProps) {
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setFile(null);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log('📂 File selected:', e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log('📤 Uploading file:', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('📥 Response status:', res.status);

      const data = await res.json();
      console.log('📥 Response JSON:', data);

      if (data.url) {
        alert(' Upload successful');
        onSave(data.url);
        onClose();
      } else {
        alert('Upload failed: No URL returned');
        console.error('Upload failed: no URL in response', data);
      }
    } catch (error) {
      alert('❌ Upload error: ' + error);
      console.error('Upload error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
