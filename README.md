### 启用CSRF
.env 加上
```text
CodeFec_App_Csrf=true
```
表单内:
```html
<x-csrf/>
```
代替laravel的
`@csrf`指令