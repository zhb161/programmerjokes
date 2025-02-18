// 获取随机图片
function getRandomImage() {
  //随机生成1-36的数字
  const randomIndex = Math.floor(Math.random() * 1027) + 1;
  return `images/${randomIndex}.webp`;
}

// 添加图片预加载功能
function preloadImages(startIndex, count) {
  for (let i = startIndex; i < startIndex + count; i++) {
    const img = new Image();
    img.src = `images/${i}.webp`;
  }
}

// 添加加载状态显示
// 获取当前显示的图片编号
let currentImageIndex = 0;

// 从 localStorage 获取收藏列表
function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}

// 保存收藏列表到 localStorage
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// 更新收藏按钮状态
function updateFavoriteButton() {
  const favorites = getFavorites();
  const favoriteButton = document.getElementById("favoriteButton");
  if (favorites.includes(currentImageIndex)) {
    favoriteButton.classList.add("text-red-500", "border-red-500");
  } else {
    favoriteButton.classList.remove("text-red-500", "border-red-500");
  }
}

// 更新收藏列表显示
// 添加分页相关变量
let currentPage = 1;
const itemsPerPage = 6; // 每页显示6张图片

// 修改更新收藏列表显示函数
// 修改 updateFavoritesList 函数中的页码信息显示
function updateFavoritesList() {
  const favoritesList = document.getElementById("favoritesList");
  const favorites = getFavorites();
  const pageInfo = document.getElementById("pageInfo");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  // 计算总页数
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  // 确保当前页码有效
  if (currentPage > totalPages) {
    currentPage = totalPages || 1;
  }

  // 获取当前页的图片
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = favorites.slice(startIndex, endIndex);

  // 更新页码信息
  pageInfo.textContent = getText("pageInfo", {
    current: currentPage,
    total: totalPages,
  });

  // 更新按钮状态
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages || totalPages === 0;

  // 渲染当前页的图片
  favoritesList.innerHTML = currentPageItems
    .map(
      (index) => `
        <div class="relative group">
            <img src="images/${index}.webp" 
                 class="w-full h-auto rounded-lg cursor-pointer" 
                 alt="Favorite Programmer Joke"
                 onclick="showFavoriteImage(${index})">
            <button onclick="removeFavorite(${index})" 
                    class="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    `
    )
    .join("");
}

// 添加分页事件处理函数
function handlePrevPage() {
  if (currentPage > 1) {
    currentPage--;
    updateFavoritesList();
  }
}

function handleNextPage() {
  const favorites = getFavorites();
  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updateFavoritesList();
  }
}

// 修改初始化代码，添加分页按钮事件监听
// 在 DOMContentLoaded 事件中添加初始化语言
document.addEventListener("DOMContentLoaded", () => {
  updateImage();
  updateFavoritesList();
  document
    .getElementById("favoriteButton")
    .addEventListener("click", toggleFavorite);
  document.getElementById("prevPage").addEventListener("click", handlePrevPage);
  document.getElementById("nextPage").addEventListener("click", handleNextPage);

  // 初始化页面语言
  updatePageContent();
});

// 添加显示收藏图片的函数
function showFavoriteImage(index) {
  const img = document.getElementById("jokeImage");
  img.style.opacity = "0.5";

  img.onload = () => {
    img.style.opacity = "1";
    currentImageIndex = index;
    updateFavoriteButton();
  };

  img.src = `images/${index}.webp`;
}

// 修改 updateImage 函数
function updateImage() {
  const img = document.getElementById("jokeImage");
  const button = document.getElementById("changeButton");
  button.disabled = true;
  img.style.opacity = "0.5";

  img.onload = () => {
    img.style.opacity = "1";
    button.disabled = false;
    currentImageIndex = parseInt(img.src.match(/\/(\d+)\.webp$/)[1]);
    updateFavoriteButton();
  };
  img.src = getRandomImage();
}

// 添加到收藏
function toggleFavorite() {
  const favorites = getFavorites();
  const index = favorites.indexOf(currentImageIndex);

  if (index === -1) {
    favorites.push(currentImageIndex);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  updateFavoriteButton();
  updateFavoritesList();
}

// 从收藏中移除
function removeFavorite(index) {
  const favorites = getFavorites();
  const position = favorites.indexOf(index);
  if (position !== -1) {
    favorites.splice(position, 1);
    saveFavorites(favorites);
    updateFavoritesList();
    updateFavoriteButton();
  }
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  updateImage();
  updateFavoritesList();
  document
    .getElementById("favoriteButton")
    .addEventListener("click", toggleFavorite);
});

// 页面加载时显示随机图片
document.addEventListener("DOMContentLoaded", updateImage);

// 点击按钮更换图片
document.getElementById("changeButton").addEventListener("click", updateImage);

// 添加模态框控制函数
function openModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageSrc;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // 防止背景滚动
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  document.body.style.overflow = ""; // 恢复背景滚动
}

// 点击模态框背景关闭
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// 添加键盘事件支持
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
