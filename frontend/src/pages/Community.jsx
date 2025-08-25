import React, { useEffect } from "react";
import { useState } from "react";
import { dummyPublishedImages } from "../assets/assets";
import Loading from "./Loading";

const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setImages(dummyPublishedImages);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 pt-12 x1:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100">
        Community Images
      </h2>
      {images.length === 0 ? (
        <p className="text-gray-600 dark:text-purple-300">
          No images have been published yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1E1B26] rounded-lg shadow-md overflow-hidden cursor-pointer"
            >
              <img
                src={image.imageUrl}
                alt={`Community Image ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                {/* <p className="text-sm text-gray-600 dark:text-purple-300 mb-2">
                  {image.description}
                </p> */}
                <p className="text-xs text-gray-400 dark:text-purple-500">
                  Uploaded by: {image.userName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
