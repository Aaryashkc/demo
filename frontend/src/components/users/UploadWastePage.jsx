import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadWastePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('non-recyclable');
  const [level, setLevel] = useState('easy');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { 
      id: 'recyclable', 
      label: 'Recyclable',
      icon: '♻️',
      description: 'Materials that can be processed and reused'
    },
    { 
      id: 'non-recyclable', 
      label: 'Non-recyclable',
      icon: '🚫',
      description: 'Items that cannot be recycled'
    },
    { 
      id: 'both', 
      label: 'Mixed',
      icon: '🔄',
      description: 'Contains both recyclable and non-recyclable items'
    }
  ];

  const levels = [
    { 
      id: 'easy', 
      label: 'Easy',
      badge: '⭐',
      description: 'Simple waste identification'
    },
    { 
      id: 'medium', 
      label: 'Medium',
      badge: '⭐⭐',
      description: 'Moderate complexity'
    },
    { 
      id: 'hard', 
      label: 'Hard',
      badge: '⭐⭐⭐',
      description: 'Complex waste sorting'
    }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload an image first');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        category,
        level,
        file,
        fileName: file.name,
        fileSize: file.size,
        timestamp: new Date().toISOString()
      });
      
      // Reset form
      setFile(null);
      setPreview(null);
      setCategory('non-recyclable');
      setLevel('easy');
      setIsSubmitting(false);
      
      // Navigate to searching page
      navigate('/searching');
    }, 1500);
  };

  return (
    <div className="app-bg">
      <div className="app-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-3">
            Upload Waste Image
          </h1>
          <p className="text-[var(--primary)]/70 text-lg">
            Help us categorize waste items by uploading images and selecting appropriate categories
          </p>
        </div>

        {/* Select Categories */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-6">
            Select Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => setCategory(item.id)}
                className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 hover:shadow-lg text-left
                  ${
                    category === item.id
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-xl scale-105'
                      : 'border-[var(--primary)]/30 bg-white text-[var(--primary)] hover:border-[var(--accent)]'
                  }
                `}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
                <p className={`text-sm ${category === item.id ? 'text-white/80' : 'text-[var(--primary)]/60'}`}>
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Select Level */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-6">
            Select Difficulty Level
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {levels.map((item) => (
              <button
                key={item.id}
                onClick={() => setLevel(item.id)}
                className={`p-5 rounded-xl border-2 transition-all transform hover:scale-105 text-left
                  ${
                    level === item.id
                      ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-lg scale-105'
                      : 'border-[var(--primary)]/30 bg-white text-[var(--primary)] hover:border-[var(--primary)]'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{item.label}</h3>
                  <span className="text-xl">{item.badge}</span>
                </div>
                <p className={`text-sm ${level === item.id ? 'text-white/80' : 'text-[var(--primary)]/60'}`}>
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-6">
            Upload Image
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Upload Box */}
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative w-full h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all
                ${isDragging 
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10 scale-105' 
                  : 'border-[var(--primary)]/40 bg-white hover:border-[var(--accent)] hover:bg-[var(--accent)]/5'
                }
              `}
            >
              {!preview ? (
                <>
                  <svg
                    className="w-16 h-16 mb-4 transition-transform hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                    />
                  </svg>
                  <p className="text-lg font-medium text-[var(--primary)] mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-[var(--primary)]/60">
                    PNG, JPG, GIF up to 5MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </>
              ) : (
                <div className="relative w-full h-full p-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveImage();
                    }}
                    className="absolute top-6 right-6 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </label>

            {/* Info Card */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--primary)]/20 shadow-sm">
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-4">
                Submission Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[var(--primary)]/10">
                  <span className="text-[var(--primary)]/70">Category:</span>
                  <span className="font-semibold text-[var(--primary)] capitalize">
                    {categories.find(c => c.id === category)?.label}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-[var(--primary)]/10">
                  <span className="text-[var(--primary)]/70">Level:</span>
                  <span className="font-semibold text-[var(--primary)] capitalize">
                    {levels.find(l => l.id === level)?.label}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-[var(--primary)]/10">
                  <span className="text-[var(--primary)]/70">Image:</span>
                  <span className="font-semibold text-[var(--primary)]">
                    {file ? file.name : 'Not uploaded'}
                  </span>
                </div>

                {file && (
                  <div className="flex justify-between items-center pb-3">
                    <span className="text-[var(--primary)]/70">File size:</span>
                    <span className="font-semibold text-[var(--primary)]">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!file || isSubmitting}
                className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition-all transform
                  ${!file || isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Waste Data'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-[var(--accent)]/10 to-[var(--primary)]/10 p-8 rounded-2xl border border-[var(--primary)]/20">
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-4">
            💡 Tips for Best Results
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[var(--primary)]/80">
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span>Ensure good lighting for clear images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span>Center the waste item in the frame</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span>Avoid blurry or out-of-focus images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span>Use images less than 5MB in size</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadWastePage;