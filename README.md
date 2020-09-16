UiL OTS LightDM Theme



## Installation

```
1. download latest release in project's `download` folder
2. copy uncompressed `lightdm-theme` folder contents to /usr/share/lightdm-webkit/themes/uilots
3. update `webkit_theme` option in /etc/lightdm/lightdm-webkit2-greeter to `uilots`
```

## Change background image

location: `assets/background.jpg`

## Development

Recommended to use `yarn` over `npm`

- `yarn` to install dependencies
- `yarn dev` runs webpack-dev-server
- `yarn build` creates bundle and assets over `/dist`

## License

This software is distributed under the MIT license, with the exception of any Utrecht University trademarks.

Consider using [enkel](https://github.com/vndre/enkel-greeter), the project this theme is based upon. (See below)


## Credits
Forked from [``enkel`` by Andre Aldana](https://github.com/vndre/enkel-greeter)

```
MIT License

Copyright (c) 2019 Andre Aldana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
