# epylinkn.github.io

WHAT TO DO WHEN YOU FORGET EVERYTHING NEXT MONTH

```
# serve the site locally at localhost:4000
jekyll serve

cp <old_post>.markdown <new_post>.markdown  # write
jekyll build                                # build
git commit && git push                      # deploy

# dealing with images
1. put them in `src/`
2. `$ exiftran -ai src/img/**/*`
3. `gulp imagemin`
```

TODOS
-----

- crop images to a standard width (images are currently 7-10 mb =[)
- un-version control `src/img/**/*`
- add editorconfig
- move away from gulpy / browserify / .styl and towards webpack...
