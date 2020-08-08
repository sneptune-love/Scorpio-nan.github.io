// 云函数入口文件
const cloud = require("wx-server-sdk");
const axios = require("axios");
const doubanbook = require("doubanbook");
cloud.init();

//isbn码获取图书信息的函数
async function getDoubanBook(isbn) {
  const url =
    "https://search.douban.com/book/subject_search?search_text=" + isbn;
  let res = await axios.get(url);

  let reg = /window\.__DATA__ = "(.*)"/;
  if (reg.test(res.data)) {
    let searchData = doubanbook(RegExp.$1)[0];
    return searchData;
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  let { a, b, isbn } = event;
  // const res = await cloud.callFunction({
  //   // 要调用的云函数名称
  //   name: "add",
  //   // 传递给云函数的参数
  //   data: {
  //     x: 1,
  //     y: 2
  //   }
  // });

  let bookInfo = await getDoubanBook(isbn);
  return {
    sum: a + b,
    title: bookInfo.title,
    image: bookInfo.cover_url
  };
};
