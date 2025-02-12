

// 获取随机图片
function getRandomImage() {
    //随机生成1-36的数字
    const randomIndex = Math.floor(Math.random() * 36) + 1
    return `images/${randomIndex}.webp`;
}

// 更新图片显示
function updateImage() {
    const img = document.getElementById('jokeImage');
    img.src = getRandomImage();
}

// 页面加载时显示随机图片
document.addEventListener('DOMContentLoaded', updateImage);

// 点击按钮更换图片
document.getElementById('changeButton').addEventListener('click', updateImage); 