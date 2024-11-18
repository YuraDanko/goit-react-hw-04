import { useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
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

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    setError("");
    setPage(1);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&page=1&per_page=12&client_id=pdoIlirQ9i-lZCJQo5VqW3te7vlrel5by2yhcCl6ys4`
      );

      if (response.data.results.length === 0) {
        const errorMessage = "No images found for your search!";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setImages(response.data.results);
      }
    } catch (err) {
      const errorMessage = "Error fetching images! Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&page=${
          page + 1
        }&per_page=12&client_id=pdoIlirQ9i-lZCJQo5VqW3te7vlrel5by2yhcCl6ys4`
      );

      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);

      setTimeout(() => {
        window.scrollBy({
          top: 850,
          behavior: "smooth",
        });
      }, 100);
    } catch (err) {
      toast.error("Error fetching more images!");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (imageUrl) => {
    console.log("Opening modal with URL:", imageUrl);
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
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <TailSpin color="#3f51b5" height={50} width={50} />
        </div>
      )}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
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
