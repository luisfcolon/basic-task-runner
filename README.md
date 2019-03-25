# Basic Task Runner

Basic Gulp task runner I use to code up quick and dirty websites - udpated to work with Gulp4.

I use this directory structure as a generic base. It changes depending on the project I am working on.

```
assets/sass
assets/js
static/css
static/js
```

Those are defined in the Gulpfile.

## Commands

### Build

Deletes css and js files generated during development.
Minifies CSS.
Babelfies JS.
Stuff and things.

```
gulp build
```

- Css files with be appended with `.min.css`
- All JS files will be compressed and concatinated to 1 file

### Clean

Deletes css and js files generated during development.

```
gulp clean
```

### Watch (Default Task)

Generates the current CSS and JS files and then waits for changes.

```
gulp
```

or

```
gulp watch
```

### Watchcss

Like watch - but only for CSS files

```
gulp watchcss
```

### Watchjs

Like watch - but only for JS files

```
gulp watchjs
```
