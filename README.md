# Tippy's 科学实验室

> 没事下班写点工具优化一下自己的工作体验😂
>
> （懒惰果然是唯一生产力
>

## 第一弹： Yapi-transform cli

> 背景：现在从 yapi 中获取 url 还要手动对照着输入键名， 并且还要按照对应的格式，感觉如果自己手敲的话充斥着比较多的重复工作（然后自己也太懒）。所以需要一个工具，复制粘贴 yapi 中的 url 就能自动生成对应的格式。

### 需求清单

工作环境：windows

| command     | description                                                  |
| ----------- | ------------------------------------------------------------ |
| -p/paste    | 针对后续添加新 url 的需求，目标是接受参数，自动转换为对应格式，并且放置在剪贴版上。 |
| -g/generate | 针对重新生成 url.js 的需求，目标是生成对应文件。             |

转换示例：

```
/xxx/v1/{deviceKey}/qos/xxx/xxx/configs/edit
```

变成如下形式：

```
editQosXxxXxxConfigs: {
	url: "/xxx/v1/{deviceKey}/qos/xxx/xxx/configs/edit",
	method: "POST"
}
```