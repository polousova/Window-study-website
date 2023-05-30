"use strict";

//импорт пакетов для проекта
const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

//путь, куда компилируется 
const dist = "./dist/";

//задачи, которые собирают проект

//отслеживание изменений в html
gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist))//переместить файл в папку dist
                .pipe(browsersync.stream());//запускаем автообновление страницы через browsersync
});

//компиляция скриптовых файлов
gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")//запускаем webpack на основном файле скрипта main.js
                .pipe(webpack({
                    mode: 'development',//режим разработки webpack
                    output: {
                        filename: 'script.js'//указываем куда будет помещаться output файл
                    },
                    watch: false, //за watch отвечает отдельная задача, поэтому здесь отключаем
                    devtool: "source-map",//создаем карту проекта
                    module: {//подключаемые модули
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',//модуль babel
                              options: {
                                presets: [['@babel/preset-env', {//с пресетом env
                                    debug: true,
                                    corejs: 3,//3я версия Core JS
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist)) //полученный файл помещается в папку dist
                .on("end", browsersync.reload); //если были изменения в файле main.js, страница перезагружается
});

//если что-то изменяется в папке src/assets, копируем все файлы из папки assets в папку dist/assets и перезагружаем страницу
gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browsersync.reload);
});

//задача watch - запускает browsersync на порте 4000
gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    //следим за изменениями отдельных файлов
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

//запуск билда
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

//запускаем webpack на main.js в режиме production
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

//запуск по умолчанию build и watch
gulp.task("default", gulp.parallel("watch", "build"));