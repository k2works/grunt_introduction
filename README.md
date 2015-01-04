Grunt入門
===
# 目的
ケーススタディで学ぶタスクの追加と実行

# 前提
| ソフトウェア     | バージョン    | 備考         |
|:---------------|:-------------|:------------|
| OS X           |10.8.5        |             |
| grunt     　　　|0.1.13        |             |

# 構成
+ [セットアップ](#1)
+ [ケース１：JavaScript開発でのデプロイ時の構文チェック、結合など](#2)
+ [ケース２：CoffeeScriptスクリプトのコンパイル、圧縮](#3)

# 詳細
## <a name="1">セットアップ</a>
```bash
$ npm install -g grunt-cli
$ cd grunt_introduction
$ npm init
$ npm install --save-dev grunt
$ touch Gruntfile.js
$ mkdir src
$ mkdir dest
```
_Gruntfile.js_
```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dist: 'dist',
    },
  });
}
```

## <a name="2">ケース１：JavaScript開発でのデプロイ時の構文チェック、結合など</a>
### ソースコードの構文チェック
```bash
$ npm install --save-dev grunt-contrib-jshint
```

_Gruntfile.js_
```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dist: 'dist',
    },
    jshint: {
      beforeconcat: ['<%= dirs.src %>/js/*.js'],
      afterconcat: ['<%= dirs.dest %>/js/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
}
```

```bash
$ grunt jshint
```

### ソースコードの結合


## <a name="3">ケース２：CoffeeScriptスクリプトのコンパイル、圧縮</a>


# 参照
+ [JavaScriptエンジニア養成読本](http://gihyo.jp/book/2014/978-4-7741-6797-8)
