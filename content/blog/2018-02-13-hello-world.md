---
title: 用pannellum.js制作全景图
date: 2020-10-26T02:34:11.697Z
thumbnail: /images/uploads/fireshot-capture-018-a-simple-example-pannellum-pannellum.org.png
---
用[pannellum.js](https://github.com/mpetroff/pannellum)制作简单的全景图，例子：点击[examples](https://pannellum.org/documentation/examples/simple-example/)

**使用cdn引入**

第一种

```html
<!DOCTYPE HTML>
<html>
<head>
<metacharset="utf-8"><metaname="viewport"content="width=device-width, initial-scale=1.0">
<title>A simple example</title>
<link rel="stylesheet"href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
<script type="text/javascript"src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script><style>#panorama{width:600px;height:400px;}</style>
</head>
<body>
<divid="panorama"></div>
<script>pannellum.viewer('panorama',{"type":"equirectangular","panorama":"https://pannellum.org/images/alma.jpg"});</script>
</body>
</html>
```

第二种

```html
<iframewidth="600"height="400"allowfullscreen style="borderstyle:none;"src="https://cdn.pannellum.org/2.5/pannellum.htm#panorama=https://pannellum.org/images/alma.jpg"></iframe>
```



**使用模块引入**

```javascript
import "pannellum/build/pannellum.js";
import "pannellum/build/pannellum.css";
pannellum.viewer('panorama',{
  "type":"equirectangular",
  "panorama":"https://pannellum.org/images/alma.jpg"
});
```



pannellum团队的[GitHub](https://github.com/mpetroff/pannellum)

pannellum的官网[https://pannellum.org](https://pannellum.org/)