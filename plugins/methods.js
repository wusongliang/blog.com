// 全局方法

export default (context, inject) => {
  inject("formatDate", (date) => {
    const cnDate = date.replace(/th\,/g, ",");
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(cnDate).toLocaleDateString("zh-cn", options);
  })
}

