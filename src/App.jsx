import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import "modern-normalize";

Modal.setAppElement("#root");

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=pdoIlirQ9i-lZCJQo5VqW3te7vlrel5by2yhcCl6ys4`
        );

        if (response.data.results.length === 0) {
          setError("No images found for your search!");
          toast.error("No images found for your search!");
        } else {
          setImages((prevImages) =>
            page === 1
              ? response.data.results
              : [...prevImages, ...response.data.results]
          );
        }
      } catch (err) {
        setError("Error fetching images! Please try again.");
        toast.error("Error fetching images!");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (page > 1) {
      setTimeout(() => {
        window.scrollBy({
          top: 900,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [images]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
}

export default App;
