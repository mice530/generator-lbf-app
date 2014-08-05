# Local Server Instruction
Local server is an integrated local development environment.

## Usage

Create app with [generator-lbf-app](http://github.com/mice530/generator-lbf-app)
> Take *example.com* as example, whose domain is *'example.com'* and workspace is *'/project/example/'*.

### Run grunt task
Run development grunt task at root of your workspace:
```bash
$ grunt dev
```

### Config hosts
```bash
$ vim /etc/hosts
$ 127.0.0.1 example.com
```

### Preview

#### Mockup pages

Source file:
```bash
/project/example/test/mockup/mockup.html
```

Uri:
```bash
http://local.example.com/mockup/mockup.html
```

#### Preview pages

Source template:
```bash
/project/example/views/mockup/mockup.html
```

Source data:
```bash
/project/example/test/page/mockup.json
```

Uri:
```bash
http://local.example.com/mockup/mockup.html
```

#### CGI

Source data:
```bash
/project/example/test/cgi/mod/cgi.json
```

Uri:
```bash
http://local.example.com/mod/cgi
```

#### Static files

Source file:
```bash
/project/example/src/modules/mod/mod.js
```

Uri:
```bash
http://local.example.com/static_proxy/modules/mod/mod.js
```
