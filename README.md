# Basic Task Runner

Basic Gulp task runner I use for quick and dirty websites - udpated to work with Gulp4.

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
