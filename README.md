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
$ cd grunt_introduction/case01
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
### よく使う情報をまとめる
#### ソースコードの構文チェック
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

#### ソースコードの結合
```bash
$ npm install --save-dev grunt-contrib-concat
```

_case01/Gruntfile.js_
```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dest: 'dest',
    },
    jshint: {
      beforeconcat: ['<%= dirs.src %>/js/*.js'],
      afterconcat: ['<%= dirs.dest %>/js/*.js']
    },
    concat: {
      js: {
        src: ['<%= dirs.src %>/js/*.js'],
        dest: '<%= dirs.dest %>/js/<%= pkg.name %>.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
};
```

```bash
$ grunt jshint:beforeconcat
$ grunt concat
$ grunt jshint:afterconcat
```

#### ライセンスコメントの挿入

_case01/Gruntfile.js_
```javascript
・・・
concat: {
  options: {
    banner: '/*! some copyright information here */',
  },
・・・
```

#### 結合したソースコードの構文チェック
```bash
$ grunt jshint:afterconcat
```

#### ソースコードの圧縮
```bash
$ npm install --save-dev grunt-contrib-uglify
```

_case01/Gruntfile.js_
```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dest: 'dest',
    },
    jshint: {
      beforeconcat: ['<%= dirs.src %>/js/*.js'],
      afterconcat: ['<%= dirs.dest %>/js/*.js']
    },
    concat: {
      options: {
        banner: '/*! some copyright information here */',
      },
      js: {
        src: ['<%= dirs.src %>/js/*.js'],
        dest: '<%= dirs.dest %>/js/<%= pkg.name %>.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! some copyright information here */',
      },
      dest: {
        files: {
          '<%= dirs.dest %>/js/<%= pkg.name %>.min.js':
          '<%= dirs.dest %>/js/<%= pkg.name %>.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
```

```bash
$ grunt jshint:beforeconcat
$ grunt concat
$ grunt jshint:afterconcat
$ grunt uglify
```

#### SourceMapの追加
_case01/Gruntfile.js_
```javascript
module.exports = function (grunt) {
・・・
      js: {
        src: ['<%= dirs.src %>/js/*.js'],
        dest: '<%= dirs.dest %>/js/<%= pkg.name %>.js',
        }
・・・
```

### タスクをまとめる
_case01/Gruntfile.js_
```javascript
・・・
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', 'Build JavaScript Files', [
    'jshint:beforeconcat',
    'concat',
    'jshint:afterconcat',
    'uglify'
  ]);
};
```

#### ソースコードの変更の監視
```bash
$ npm install --save-dev grunt-contrib-watch
```
_case01/Gruntfile.js_
```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dest: 'dest',
    },
    jshint: {
      beforeconcat: ['<%= dirs.src %>/js/*.js'],
      afterconcat: ['<%= dirs.dest %>/js/*.js']
    },
    concat: {
      options: {
        banner: '/*! some copyright information here */',
      },
      js: {
        src: ['<%= dirs.src %>/js/*.js'],
        dest: '<%= dirs.dest %>/js/<%= pkg.name %>.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! some copyright information here */',
        sourceMap: true
      },
      dest: {
        files: {
          '<%= dirs.dest %>/js/<%= pkg.name %>.min.js':
          '<%= dirs.dest %>/js/<%= pkg.name %>.js'
        }
      }
    },
    watch: {
      files: ['<%= dirs.src %>/js/*.js'],
      tasks: ['build'],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', 'Build JavaScript Files', [
    'jshint:beforeconcat',
    'concat',
    'jshint:afterconcat',
    'uglify'
  ]);
};
```

```bash
$ grunt watch
```
## <a name="3">ケース２：CoffeeScriptスクリプトのコンパイル、圧縮</a>
### CoffeeScriptのコンパイル
```bash
$ npm install --save-dev grunt-contrib-coffee
```

_case02/Gruntfile.js_
```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dest: 'dest',
    },
    coffee: {
      compile: {
        files: {
          '<%= dirs.dest %>/js/<%= pkg.name %>.js':
          '<%= dirs.src %>/coffee/*.coffee'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
};
```

```bash
$ grunt coffee
```

# 参照
+ [JavaScriptエンジニア養成読本](http://gihyo.jp/book/2014/978-4-7741-6797-8)
