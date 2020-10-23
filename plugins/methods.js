// 全局方法

export default (context, inject) => {
  inject("formatDate", (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("zh-cn", options);
  })
}

