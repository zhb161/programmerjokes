const translations = {
  zh: {
    title: "程序员笑话",
    nextJoke: "下一个",
    myFavorites: "我的收藏",
    about: "关于",
    aboutContent1:
      "欢迎来到程序员笑话！这里收录了1000+精选编程梗图，涵盖程序员日常工作中的每一个欢乐瞬间。",
    aboutContent2:
      "无论是和Bug斗智斗勇，还是被Git合并折磨；是加班时刻的咖啡续命，还是代码审查的灵魂拷问 —— 在这里，你都能找到共鸣。因为幽默，是程序员必备的第二技能！",
    prevPage: "上一页",
    nextPage: "下一页",
    pageInfo: "第 ${current} 页，共 ${total} 页",
    imageAlt: "点击查看大图",
    modalAlt: "大图预览",
  },
  en: {
    title: "Programmer Jokes",
    nextJoke: "Next Joke",
    myFavorites: "My Favorites",
    about: "About",
    aboutContent1:
      "Welcome to Programmer Jokes! Dive into our treasure trove of 1000+ handpicked programming memes that perfectly capture the essence of developer life.",
    aboutContent2:
      "Whether you're battling with merge conflicts, celebrating successful deployments, or questioning your life choices during debugging sessions - we've got a meme for every coding moment. Because sometimes, laughter is the best debugging tool!",
    prevPage: "Previous",
    nextPage: "Next",
    pageInfo: "Page ${current} of ${total}",
    imageAlt: "Click to view full size",
    modalAlt: "Full size preview",
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  updatePageContent();
}

function getText(key, params = {}) {
  const text = translations[currentLang][key];
  return text.replace(/\${(\w+)}/g, (_, key) => params[key] || "");
}

function updatePageContent() {
  // 更新标题
  document.title = getText("title") + " - Daily Coding Humor";
  document.querySelector("h1").textContent = getText("title");

  // 更新按钮文本
  document.getElementById("changeButton").textContent = getText("nextJoke");
  document.querySelector("#favoritesSection h2").textContent =
    getText("myFavorites");

  // 更新关于部分
  const aboutTitle = document.querySelector(
    ".max-w-2xl.mx-auto.mt-8.text-gray-600 h2"
  );
  aboutTitle.textContent = getText("about");

  const aboutParagraphs = document.querySelectorAll(
    ".max-w-2xl.mx-auto.mt-8.text-gray-600 p"
  );
  aboutParagraphs[0].textContent = getText("aboutContent1");
  aboutParagraphs[1].textContent = getText("aboutContent2");

  // 更新分页按钮
  document.getElementById("prevPage").textContent = getText("prevPage");
  document.getElementById("nextPage").textContent = getText("nextPage");

  // 更新页码信息
  updateFavoritesList(); // 这会更新页码信息
}
