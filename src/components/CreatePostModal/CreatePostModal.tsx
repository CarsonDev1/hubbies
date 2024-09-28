import React from 'react';
import { FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill';

interface CreatePostModalProps {
  showCreatePost: boolean;
  setShowCreatePost: (show: boolean) => void;
  postContent: string;
  setPostContent: (content: string) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  setShowCreatePost,
  postContent,
  setPostContent,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'color',
    'background',
    'font',
    'align',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="relative w-full max-w-4xl p-5 mx-auto bg-white border rounded-md shadow-lg top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create New Post
          </h3>
          <button
            onClick={() => setShowCreatePost(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Template
          </label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">Choose a template</option>
            <option value="news">News Article</option>
            <option value="blog">Blog Post</option>
            <option value="review">Product Review</option>
          </select>
          <ReactQuill
            theme="snow"
            value={postContent}
            onChange={setPostContent}
            modules={modules}
            formats={formats}
            className="h-64 mb-4"
          />
        </div>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setShowCreatePost(false)}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
