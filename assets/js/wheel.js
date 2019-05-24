$(document).ready(function () {

    /****************/
    ////ROUE DIANA////
    /****************/

    if ($("svg").length) {
        Snap.plugin(function (Snap, Element, s, glob) { //PLUG IN MULTI-TEXT
            s.prototype.multitext = function (x, y, txt, splt_mth) {
                txt = txt.split(splt_mth);
                var t = this.text(x, y, txt);
                t.selectAll("tspan:nth-child(n+2)").attr({
                    dy: "1.2em",
                    x: x,
                    "class": "second-elem"
                });
                t.select("tspan:first-child").attr({
                    "class": "first-elem"
                });
                return t;
            };
        });
        var s = new Snap("#calque"), //-----DECLARATION BALISE SVG
            path_array = { //-----DECLARATION TRACES MAIN_PATH NORMAL/LITE/DEGRES
                "1": {
                    "normal": "M899,627.1l354.6-115.2c-80.7-239.5-294.1-394.6-546.8-397.4v374.2C795.1,491.4,869.8,548.2,899,627.1z",
                    "lite": "M900.7,626.4l84.6-27.6C944.4,484.9,838.1,402.4,708.5,399v89C796.8,490.8,871.6,547.6,900.7,626.4z",
                    "deg": "72",
                    "title": "VOLUPTATEM",
                    "quote": "Sed ut /nperspiciatis unde"
                },
                "2": {
                    "normal": "M1257.8,524.7L903.3,639.9c30,107.4-22.9,188.8-72.4,227.7l218,300.1C1251.7,1016.9,1333.3,765.9,1257.8,524.7z",
                    "lite": "M989.7,611.9L905,639.3c30,107.4-22.9,188.8-72.4,227.7l52.4,71.9C977.8,867.8,1028.3,741.6,989.7,611.9z",
                    "deg": "144",
                    "title": "NESCIUNT",
                    "quote": "Nemo enim ipsam /nvoluptatem quia voluptas"
                },
                "3": {
                    "normal": "M820,875.6c-70.8,49-167,50.2-240,0l-217.9,300c207.1,146.9,468.9,146.2,675.9,0L820,875.6z",
                    "lite": "M821.8,874.9c-70.8,49-167,50.2-240,0L529.5,947c107.7,74.7,246.4,69.5,344.5-0.1L821.8,874.9z",
                    "deg": "216",
                    "title": "QUISQUAM",
                    "quote": "t enim ad minima veniam /nquis nostrum"
                },
                "4": {
                    "normal": "M496.7,639.9L142.2,524.7c-75.5,241.2,6,492.2,208.9,642.9l218-300.1C501.9,814.1,471.2,725.1,496.7,639.9z",
                    "lite": "M498.5,639.3l-84.6-27.6c-31.8,105.5-9.3,237.5,104.7,327.3l52.3-72C503.7,813.4,472.9,724.4,498.5,639.3z",
                    "deg": "288",
                    "title": "REPREHENDERIT",
                    "quote": "Quis autem vel eum /niure reprehenderit"
                },
                "5": {
                    "normal": "M693.2,488.7V114.5c-252.7,2.7-466.2,157.8-546.8,397.4L501,627.1C530.2,548.2,604.9,491.4,693.2,488.7z",
                    "lite": "M695,488v-89c-119.7,2.4-232.7,77.4-276.9,199.9l84.7,27.5C531.9,547.6,606.7,490.8,695,488z",
                    "deg": "0",
                    "title": "COMMODI",
                    "quote": "El illum qui dolorem /neum fugiat quo"
                }
            },
            sub_petal = "M1039.6,224.3c-101.9-73.7-220.9-109-336.7-109.8l0.2,268.1c65.3,0.6,127.8,21.1,181.3,58.9L1039.6,224.3z",
            selector_list = $(".list-container ul"), //-----DECLARATION ELEMENTS LISTE SUB-NAV DYNAMIQUE
            list_array = {},
            content = {},
            //-----AJOUT MAIN-PATH A LA BALISE SGV
            path_1 = s.path(path_array["1"]["normal"]).attr({
                fill: "#1cbb9b",
                id: "path_purple",
                index: "1",
                class: "sensations"
            }),
            path_2 = s.path(path_array["2"]["normal"]).attr({
                fill: "#f05151",
                id: "path_brown",
                index: "2",
                class: "essential"
            }),
            path_3 = s.path(path_array["3"]["normal"]).attr({
                fill: "#4caced",
                id: "path_blue",
                index: "3",
                class: "selection"
            }),
            path_4 = s.path(path_array["4"]["normal"]).attr({
                fill: "#e6ce47",
                id: "path_green",
                index: "4",
                class: "nature"
            }),
            path_5 = s.path(path_array["5"]["normal"]).attr({
                fill: "#a38f84",
                id: "path_yellow",
                index: "5",
                class: "vitality"
            }),
            bigCircle = s.circle(700, 700, 207);

        var path_gr = s.group(path_1, path_2, path_3, path_4, path_5), //-----GROUPEMENT PATH DANS BALISE <G> + DECLARATION VAR GROUPE MAIN-PATH
            path_main_gr = $("g[id*='group_main_']"),
            path = $("path", path_main_gr),
            icon_group = $("img", path_main_gr);

        var coordinated_array = { //-----DECLARATION COORDONNEES ICONES / TEXTES MAIN PATH
            "1": {
                "img": {
                    "x": "897",
                    "y": "250"
                },
                "img_active": {
                    "x": "815",
                    "y": "455"
                },
                "text": {
                    "x": "930",
                    "y": "386"
                },
                "color": "#57ccb4"
            },
            "2": {
                "img": {
                    "x": "1045",
                    "y": "720"
                },
                "img_active": {
                    "x": "907",
                    "y": "730"
                },
                "text": {
                    "x": "1080",
                    "y": "850"
                },
                "color": "#ff746e"
            },
            "3": {
                "img": {
                    "x": "665",
                    "y": "980"
                },
                "img_active": {
                    "x": "662",
                    "y": "916"
                },
                "text": {
                    "x": "703",
                    "y": "1110"
                },
                "color": "#6ecbff"
            },
            "4": {
                "img": {
                    "x": "287",
                    "y": "695"
                },
                "img_active": {
                    "x": "417",
                    "y": "736"
                },
                "text": {
                    "x": "320",
                    "y": "825"
                },
                "color": "#f7da64"
            },
            "5": {
                "img": {
                    "x": "425",
                    "y": "245"
                },
                "img_active": {
                    "x": "513",
                    "y": "453"
                },
                "text": {
                    "x": "460",
                    "y": "380"
                },
                "color": "#d7c2b6"
            },
        }

        var coordinated_subpath_array = { //-----DECLARATION COORDONNEES ICONES / TEXTES MAIN PATH
            "1": {
                "index": {
                    "x": "830",
                    "y": "310"
                },
                "img": {
                    "x": "805",
                    "y": "210"
                }
            },
            "2": {
                "index": {
                    "x": "1060",
                    "y": "470"
                },
                "img": {
                    "x": "1038",
                    "y": "370"
                }
            },
            "3": {
                "index": {
                    "x": "1140",
                    "y": "730"
                },
                "img": {
                    "x": "1115",
                    "y": "633"
                }
            },
            "4": {
                "index": {
                    "x": "1055",
                    "y": "1000"
                },
                "img": {
                    "x": "1030",
                    "y": "904"
                }
            },
            "5": {
                "index": {
                    "x": "830",
                    "y": "1150"
                },
                "img": {
                    "x": "805",
                    "y": "1050"
                }
            },
            "6": {
                "index": {
                    "x": "560",
                    "y": "1160"
                },
                "img": {
                    "x": "535",
                    "y": "1060"
                }
            },
            "7": {
                "index": {
                    "x": "340",
                    "y": "1000"
                },
                "img": {
                    "x": "315",
                    "y": "900"
                }
            },
            "8": {
                "index": {
                    "x": "250",
                    "y": "730"
                },
                "img": {
                    "x": "225",
                    "y": "630"
                }
            },
            "9": {
                "index": {
                    "x": "330",
                    "y": "460"
                },
                "img": {
                    "x": "306",
                    "y": "367"
                }
            },
            "10": {
                "index": {
                    "x": "560",
                    "y": "320"
                },
                "img": {
                    "x": "535",
                    "y": "225"
                }
            }
        };

        $("path[id*='path_']").each(function (i) { //FONCTION MISE EN PLACE DES ICONE ET TITRES POUR MAIN_PATH
            var index = i + 1,
                img_x = coordinated_array[index]["img"]["x"],
                img_y = coordinated_array[index]["img"]["y"],
                text_x = coordinated_array[index]["text"]["x"],
                text_y = coordinated_array[index]["text"]["y"],
                this_class = $(this).attr("class"),
                title_path = "" + path_array[index]["title"],
                quote_path = "/n" + path_array[index]["quote"],
                string_path = title_path + quote_path,
                main_path_item = path_gr[i],
                svg_text_title = s.multitext(text_x, text_y, string_path, "/n").attr({ //DECLARATION MULTITEXTE
                    font: "Arial",
                    textAnchor: "middle",
                    fill: "#fff",
                    index: index
                });


            window["group_main_" + index] = s.group(main_path_item, svg_text_title).attr({ // ASSEMBLAGE IMG + TEXTE DANS GROUPE
                id: "group_main_" + index,
                index: index,
                "class": "group_main_path"
            });
            var image = window["group_main_" + index].image("../assets/img/icone-" + this_class + ".png", img_x, img_y, 70, 70).attr({ //DECLARATION ICONES
                id: "img_" + index,
                index: index
            });
        });
        bigCircle.attr({ //-----AJOUT PROPRIETE CSS + INDEX AUX MAIN-PATH
            fill: "transparent"
        });


        selector_list.each(function () { //FUNCTION DECLARATION TABLEAU EN FONCTION DES LISTES DYNAMIQUE

            var item_name = $(this).attr("class"),
                item_length = $(this).children("li").length;

            if (item_length == 0) {
                $("#" + item_name).addClass("disable");
            } else {
                $("#" + item_name).addClass("enable");
            }

            list_array[item_name] = { //DECLARATION TABLEAU EN FONCTION DES LISTES DYNAMIQUE
                "list_length": item_length,
                "content": $("li", this).each(function () {
                    var list_content = $(this).text();
                })
            };
        });

        $("path.disable").css({
            fill: "#d8d8d8"
        })

        function main_path() { //-----EVENEMENT AU CLICK SUR UN DES MAIN-PATH
            //console.log($(this).index());
            var path_nth_child = $(this).attr("index"),
                id = $("path", this).attr("id"),
                $class = $("path", this).attr("class"),
                color = "" + $("path", this).attr("fill"),
                item_number = list_array[id]["list_length"],
                item_deg = path_array[path_nth_child]["deg"],
                img_x = parseInt(coordinated_array[path_nth_child]["img"]["x"], 10),
                img_y = parseInt(coordinated_array[path_nth_child]["img"]["y"], 10);

            if ($(this).hasClass("active")) { //-----SI LE PATH CLIC A DEJA LA CLASSE ACTIVE

                btn_center();

            } else if ($("g[id*='group_main_']").hasClass("active")) { //-----SI AU MOMENT DU CLIC UN AUTRE PATH EST DEJA ACTIVE

                $(".groupe_sub_path").remove(); //-----SUPPR TOUTES LES SUB_PATH
                $(".groupe_sub_path_animate").remove(); //-----SUPPR TOUTES LES SUB_PATH

                $("g[id*='group_main_']").each(function () { //-----REAJUSTER TOUS LES MAIN_PATH
                    var this_index = $(this).attr("index");
                    window["group_main_" + this_index].select("g path").animate({
                        d: path_array[this_index]["lite"]
                    }, 300, mina.backout);
                    window["group_main_" + this_index].select("g image").animate({
                        x: parseInt(coordinated_array[this_index]["img_active"]["x"], 10),
                        y: parseInt(coordinated_array[this_index]["img_active"]["y"], 10)
                    }, 100);
                    window["group_main_" + this_index].select("g text").attr({
                        opacity: 0
                    }, 100);
                });

                $("g[id*='group_main_']").removeClass("active");
                $(this).addClass("active");
                window["group_main_" + path_nth_child].select("g path").animate({
                    d: path_array[path_nth_child]["normal"]
                }, 300, mina.easein);
                window["group_main_" + path_nth_child].select("g image").animate({
                    x: img_x,
                    y: img_y
                }, 150);
                window["group_main_" + path_nth_child].select("g text").animate({
                    opacity: 1
                }, 100);

                sub_path_fnct(path_nth_child, id, $class); //-----FUNCTION SUB-PATH

            } else { //----- SI AUCUN PATH N'EST ACITVE AU MOMENT DU CLIC

                $(this).addClass("active");
                window["group_main_" + path_nth_child].select("g path").animate({
                    d: path_array[path_nth_child]["normal"]
                }, 300, mina.easein);
                window["group_main_" + path_nth_child].select("g image").animate({
                    x: img_x,
                    y: img_y
                }, 150);
                window["group_main_" + path_nth_child].select("g text").animate({
                    opacity: 1
                }, 100);
                sub_path_fnct(path_nth_child, id, $class); //-----FUNCTION SUB-PATH
                var not_this = $("g[id*='group_main_']").not(this);
                $(not_this).each(function () {
                    var this_index = parseInt($(this).attr("index"), 10),
                        img_x_active = parseInt(coordinated_array[this_index]["img_active"]["x"], 10),
                        img_y_active = parseInt(coordinated_array[this_index]["img_active"]["y"], 10),
                        this_path = Snap.select("path", this);
                    window["group_main_" + this_index].select("g path").animate({
                        d: path_array[this_index]["lite"]
                    }, 300, mina.easein);
                    window["group_main_" + this_index].select("g image").animate({
                        x: img_x_active,
                        y: img_y_active
                    }, 150);
                    window["group_main_" + this_index].select("g text").animate({
                        opacity: 0
                    }, 100);
                });
            };

            function sub_path_fnct(count, f, k) {
                var count_slice = parseInt(count * 2, 10);
                setTimeout(function () {

                    for (var i = 0, j = count_slice; i < item_number; i++) { //-----FONCTION CREER SUB-PATH EN FONCTION DU TABLEAU 
                        if (j > 9) {
                            j = 0;
                        } else {}
                        j++;
                        var path_name = "sub_path_" + i,
                            path_link = list_array[id]["content"][i]["dataset"]["href"],
                            path_content_text = "" + $("." + f).children("li").eq(i).text(),
                            path_content_img_url = "" + $("." + f).children("li").eq(i).attr("data-url"),
                            text_cordinate_x = parseInt(coordinated_subpath_array[(j)]["index"]["x"], 10),
                            text_cordinate_y = parseInt(coordinated_subpath_array[(j)]["index"]["y"], 10),
                            img_x = parseInt(coordinated_subpath_array[(j)]["img"]["x"], 10),
                            img_y = parseInt(coordinated_subpath_array[(j)]["img"]["y"], 10),
                            sub_path_color = coordinated_array[(count)]["color"];

                        path_name = s.path(sub_petal).attr({
                            "fill-opacity": "0",
                            fill: "#fff",
                            id: "sub_path_" + (i + 1),
                            class: "sub_path",
                            index: i + 1
                        });
                        //console.log(path_content_text);
                        var this_text = s.multitext(text_cordinate_x, text_cordinate_y, path_content_text, " /n").attr({
                            id: i + 1,
                            "data-coord": j,
                            font: "Arial",
                            textAnchor: "middle",
                            fill: "#fff",
                            opacity: 0
                        });
                        var image = s.image(path_content_img_url, img_x, img_y, 50, 50).attr({ //DECLARATION ICONES
                            id: "img_" + (i + 1),
                            index: (i + 1),
                            opacity: 0
                        });
                        //console.log(item_deg);
                        path_name.transform('r' + (item_deg - 36) + ',700,700');
                        window["groupe_sub_path_animate_" + (i + 1)] = s.group(path_name);
                        window["groupe_sub_path_" + (i + 1)] = s.group(this_text, image);
                        window["groupe_sub_path_" + (i + 1)].attr({
                            id: "groupe_sub_path_" + (i + 1),
                            "class": "groupe_sub_path",
                            onclick: "location.href='" + path_link + "'"
                        });
                        window["groupe_sub_path_animate_" + (i + 1)].attr({
                            "class": "groupe_sub_path_animate"
                        });
                    }

                    var sub_path_grp = $(".sub_path");
                    setTimeout(function () {

                        sub_path_grp.each(function (i) { //-----FONCTION ANIMER SUB-PATH EN FONCTION DE L'ANGLE DU MAIN_PATH
                            //console.log(i);
                            var index = $(this).attr("index"),
                                radiant = parseInt(item_deg, 10) - (36 * parseInt(i + 1, 10));
                            //console.log(radiant);
                            window["groupe_sub_path_animate_" + index].select("g path").animate({
                                "fill-opacity": "1",
                                fill: sub_path_color
                            }, 10);
                            window["groupe_sub_path_animate_" + index].animate({
                                "transform": "r" + 36 * (i + 1) + ",700,700"
                            }, 500, mina.backout);

                            window["groupe_sub_path_" + index].select("g text").animate({
                                opacity: 1
                            }, 500);
                            window["groupe_sub_path_" + index].select("g image").animate({
                                opacity: 1
                            }, 500);
                        });
                    }, 50);
                }, 200);

            }
        };

        function btn_center() { //-----EVENT AU CLICK SUR LE CERCLE CENTRAL 
            $("g[id*='group_main_']").removeClass("active");
            $("g[id*='group_main_']").each(function () { //-----REAJUSTEMENT
                var this_index = $(this).attr("index");
                window["group_main_" + this_index].select("g path").animate({ //-----REAJUSTER TOUS LES TRACES PRINCIPAUX
                    d: path_array[this_index]["normal"]
                }, 300, mina.backout);
                window["group_main_" + this_index].select("g image").animate({ //-----REAJUSTER TOUTES LES ICONES PRINCIPALES
                    x: parseInt(coordinated_array[this_index]["img"]["x"], 10),
                    y: parseInt(coordinated_array[this_index]["img"]["y"], 10)
                }, 100);
                window["group_main_" + this_index].select("g text").attr({
                    opacity: 1
                }, 150);

            })
            $(".groupe_sub_path").remove(); //-----SUPPR TOUTES LES SUB_PATH
            $(".groupe_sub_path_animate").remove(); //-----SUPPR TOUTES LES SUB_PATH
        };
        $(".enable").parent("g[id*='group_main_']").on("click", main_path);
        $("circle").on("click", btn_center);

    } else {}

    var wheel = document.getElementById("wheel");



})
