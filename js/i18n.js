const translations = {
  zh: {
    title: "程序员笑话",
    nextJoke: "下一个",
    myFavorites: "我的收藏",
    about: "关于",
    aboutContent1:
      "欢迎来到程序员笑话！我们精心策划了最有趣的编程相关梗图，让您的编码时光更加愉快。",
    aboutContent2:
      "从调试噩梦到代码审查的趣事，我们的内容涵盖了开发者生活的方方面面。休息一下，开怀一笑吧！毕竟，最优秀的程序员也需要放松时刻！",
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
      "Welcome to Programmer Jokes! We've curated a collection of the funniest programming-related memes to brighten up your coding sessions.",
    aboutContent2:
      "From debugging nightmares to code review humor, our collection covers all aspects of a developer's life. Take a break, have a laugh, and remember - even the best programmers need a good laugh sometimes!",
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
