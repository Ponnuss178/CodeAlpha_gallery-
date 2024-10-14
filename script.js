document.addEventListener("DOMContentLoaded", function () {
    const accessKey = "nRQ0JyrH9K2JhC7B6JBIB7uRAzqX8RTAym7qdSEsVAY"; // Your Unsplash API key
    const gallery = document.getElementById("gallery");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const loadMoreBtn = document.getElementById("load-more-btn");
  
    let currentQuery = '';
    let page = 1;
  
    // Fetch random images as default
    const fetchRandomImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=9&client_id=${accessKey}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching random images:", error);
        return [];
      }
    };
  
    // Fetch searched images
    const fetchImages = async (query, page) => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=9&client_id=${accessKey}`
        );
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error("Error fetching images:", error);
        return [];
      }
    };
  
    // Render images in the gallery
    const renderImages = (images) => {
      images.forEach((image) => {
        const imgElement = document.createElement("div");
        imgElement.classList.add("gallery-item");
        imgElement.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}">`;
        gallery.appendChild(imgElement);
      });
    };
  
    // Load random images when the page loads
    const loadRandomImages = async () => {
      loadMoreBtn.style.display = "none";
      const randomImages = await fetchRandomImages();
      renderImages(randomImages);
      loadMoreBtn.style.display = "none"; // Hide the "Load More" button until a search is performed
    };
  
    // Load images after searching
    const loadImages = async () => {
      loadMoreBtn.style.display = "none";
      const images = await fetchImages(currentQuery, page);

      renderImages(images);
      if (images.length > 0) {
        loadMoreBtn.style.display = "block";
      } else {
        loadMoreBtn.style.display = "none";
      }
    };
  
    // Event listener for search button
    searchBtn.addEventListener("click", async () => {
      gallery.innerHTML = ''; // Clear previous results
      currentQuery = searchInput.value;
      page = 1;
      await loadImages();
    });
  
    // Event listener for "Load More" button
    loadMoreBtn.addEventListener("click", async () => {
      page++;
      await loadImages();
    });
  
    // Load random images on page load
    loadRandomImages();
  });
