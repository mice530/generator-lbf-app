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

#### [Mockup pages](../app/templates/dirTemplate/dev/mockup/readme.md)

#### [Preview pages](../app/templates/dirTemplate/dev/page/readme.md)

#### [Emulate CGI](../app/templates/dirTemplate/dev/cgi/readme.md)

#### Static files

Source file:
```bash
/project/example/src/modules/mod/mod.js
```

Uri:
```bash
http://local.example.com/static_proxy/modules/mod/mod.js
```
