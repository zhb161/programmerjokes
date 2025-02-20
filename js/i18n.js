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
    hero: {
      title: "让编程充满欢乐",
      subtitle: "1000+ 精选编程梗图，让你在代码中找到快乐"
    },
    features: {
      title: "特色功能",
      list: [
        {
          title: "海量梗图",
          description: "1000+ 精选编程梗图，持续更新"
        },
        {
          title: "收藏功能",
          description: "收藏喜欢的梗图，随时回顾"
        }
      ]
    },
    faq: {
      title: "常见问题",
      list: [
        {
          question: "内容会定期更新吗？",
          answer: "是的，我们会定期添加新的优质内容。"
        },
        {
          question: "如何提交自己的梗图？",
          answer: "您可以通过页脚的邮箱地址向我们投稿。"
        }
      ]
    },
    footer: {
      copyright: "© 2024 Ice Zhang. 保留所有权利。",
      contact: "联系方式：zhanghaobing913@gmail.com"
    }
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
    hero: {
      title: "Making Programming Fun",
      subtitle: "1000+ Curated Programming Memes to Brighten Your Code"
    },
    features: {
      title: "Features",
      list: [
        {
          title: "Massive Collection",
          description: "1000+ curated programming memes, regularly updated"
        },
        {
          title: "Favorites System",
          description: "Save your favorite memes for later"
        }
      ]
    },
    faq: {
      title: "FAQ",
      list: [
        {
          question: "Do you update content regularly?",
          answer: "Yes, we regularly add new quality content."
        },
        {
          question: "Can I submit my own memes?",
          answer: "You can submit your memes through the email address provided in the footer."
        }
      ]
    },
    footer: {
      copyright: "© 2024 Ice Zhang. All rights reserved.",
      contact: "Contact: zhanghaobing913@gmail.com"
    }
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  updatePageContent();
}

function getText(key, params = {}) {
  const keys = key.split('.');
  let text = translations[currentLang];
  for (const k of keys) {
    text = text[k];
    if (text === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key; // 返回键名作为后备文本
    }
  }
  return text.replace ? text.replace(/\${(\w+)}/g, (_, key) => params[key] || "") : text;
}

function updatePageContent() {
  // 更新标题
  document.title = getText("title") + " - Daily Coding Humor";
  document.querySelector("h1").textContent = getText("title");

  // 更新按钮文本
  document.getElementById("changeButton").textContent = getText("nextJoke");
  document.querySelector("#favoritesSection h2").textContent = getText("myFavorites");

  // 更新 Hero 部分
  document.getElementById("heroTitle").textContent = getText("hero.title");
  document.getElementById("heroSubtitle").textContent = getText("hero.subtitle");

  // 更新 Features 部分
  document.getElementById("featuresTitle").textContent = getText("features.title");
  const featuresList = document.getElementById("featuresList");
  featuresList.innerHTML = translations[currentLang].features.list
    .map(feature => `
      <div class="p-6 bg-white rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
        <p class="text-gray-600">${feature.description}</p>
      </div>
    `)
    .join("");

  // 更新 FAQ 部分
  document.getElementById("faqTitle").textContent = getText("faq.title");
  const faqList = document.getElementById("faqList");
  faqList.innerHTML = translations[currentLang].faq.list
    .map(faq => `
      <div class="p-6 bg-white rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-2">${faq.question}</h3>
        <p class="text-gray-600">${faq.answer}</p>
      </div>
    `)
    .join("");

  // 更新关于部分
  document.getElementById("aboutTitle").textContent = getText("about");
  document.getElementById("aboutContent1").textContent = getText("aboutContent1");
  document.getElementById("aboutContent2").textContent = getText("aboutContent2");

  // 更新 Footer 部分
  document.getElementById("footerCopyright").textContent = getText("footer.copyright");
  document.getElementById("footerContact").textContent = getText("footer.contact");

  // 更新分页按钮
  document.getElementById("prevPage").textContent = getText("prevPage");
  document.getElementById("nextPage").textContent = getText("nextPage");

  // 更新页码信息
  updateFavoritesList(); // 这会更新页码信息
}
