# express-client-errorlog

Express middleware for server-side logging of client-side Javascript errors.

## Example

In your express app:

```js
var express = require('express');
var errorlog = require('express-client-errorlog');
var app = express();
app.use(errorlog());
```

In your client-side HTML:

```html
<script src='/path/to/express/app/errorlog.js'></script>
```

## Options

```js
app.use(errorlog(options));
```

 * `options.logger`  
A [winston](https://github.com/winstonjs/winston) logger to which the errors
will be sent.

 * `options.headers`  
A list of HTTP headers to send in the [winston](https://github.com/winstonjs/winston) meta object.
